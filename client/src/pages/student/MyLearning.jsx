import React, { useState, useEffect } from "react";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Calendar from "react-calendar";
import Modal from "react-modal";
import 'react-calendar/dist/Calendar.css';
import { FaCopy } from "react-icons/fa";

Modal.setAppElement("#root");

const MyLearning = () => {
  const { data: coursesData } = useGetPublishedCourseQuery();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [meetingsForDay, setMeetingsForDay] = useState([]);
  const [now, setNow] = useState(new Date());
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("");
  const [activeTab, setActiveTab] = useState("upcoming"); // upcoming or past

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openZoomMeeting = (url) => {
    if (!url) return alert("Zoom meeting URL not available.");
    window.open(url, "_blank");
  };

  const copyToClipboard = (url) => {
    if (!url) return alert("No URL to copy.");
    navigator.clipboard.writeText(url);
    alert("Meeting URL copied to clipboard!");
  };

  const allMeetings = [];
  coursesData?.courses?.forEach((course) => {
    course.zoomMeetings?.forEach((meeting) => {
      allMeetings.push({
        ...meeting,
        courseTitle: course.courseTitle,
        teacherName: course.creator?.name || "Instructor",
        teacherEmail: course.creator?.email || "N/A",
        teacherProfile: course.creator?.profilePic || null,
      });
    });
  });

  const filteredMeetings = selectedCourseFilter
    ? allMeetings.filter((m) => m.courseTitle === selectedCourseFilter)
    : allMeetings;

  const upcomingMeetings = filteredMeetings
    .filter((m) => new Date(m.start_time) >= now)
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  const pastMeetings = filteredMeetings
    .filter((m) => new Date(m.start_time) < now)
    .sort((a, b) => new Date(b.start_time) - new Date(a.start_time));

  const meetingsToShow = activeTab === "upcoming" ? upcomingMeetings : pastMeetings;

  const handleDayClick = (date) => {
    const dayMeetings = filteredMeetings.filter(
      (m) => new Date(m.start_time).toDateString() === date.toDateString()
    );
    setMeetingsForDay(dayMeetings);
    setSelectedDate(date);
    setModalIsOpen(true);
  };

  const getCountdown = (startTime) => {
    const diff = new Date(startTime) - now;
    if (diff <= 0) return "Ongoing / Started!";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getMeetingStatus = (startTime, duration) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    if (now >= start && now <= end) return "Ongoing";
    if (now < start) return "Upcoming";
    return "Completed";
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-orange-500 text-white";
      case "Upcoming":
        return "bg-green-500 text-white";
      case "Completed":
        return "bg-gray-400 text-white";
      default:
        return "bg-gray-300 text-white";
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-3xl mb-6 text-center">MY LEARNING</h1>

      {/* Filter by course */}
      <div className="mb-6 flex items-center gap-4">
        <label className="font-semibold">Filter by Course:</label>
        <select
          className="border rounded p-2"
          value={selectedCourseFilter}
          onChange={(e) => setSelectedCourseFilter(e.target.value)}
        >
          <option value="">All Courses</option>
          {coursesData?.courses?.map((c) => (
            <option key={c._id} value={c.courseTitle}>
              {c.courseTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`p-2 rounded font-semibold ${activeTab === "upcoming" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`p-2 rounded font-semibold ${activeTab === "past" ? "bg-orange-500 text-white" : "bg-gray-300"}`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-10 p-4 border rounded-lg shadow-lg bg-white">
        <h2 className="font-semibold text-2xl mb-4">Calendar View</h2>
        <Calendar
          onClickDay={handleDayClick}
          value={selectedDate}
          tileContent={({ date }) => {
            const dayMeetings = filteredMeetings.filter(
              (m) => new Date(m.start_time).toDateString() === date.toDateString()
            );
            return dayMeetings.length > 0 ? (
              <div className="bg-orange-500 text-white rounded-full w-5 h-5 text-center text-xs mt-1">
                {dayMeetings.length}
              </div>
            ) : null;
          }}
        />
      </div>

      {/* Grid of meetings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meetingsToShow.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No {activeTab} meetings.
          </p>
        ) : (
          meetingsToShow.map((meeting) => {
            const status = getMeetingStatus(meeting.start_time, meeting.duration);
            return (
              <div
                key={meeting.meetingId || meeting._id}
                className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition flex flex-col justify-between"
              >
                {/* Badge */}
                <div className="flex justify-between items-start mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(status)}`}>
                    {status}
                  </span>
                </div>

                {/* Teacher */}
                <div className="flex items-center gap-4 mb-3">
                  {meeting.teacherProfile ? (
                    <img
                      src={meeting.teacherProfile}
                      alt={meeting.teacherName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      {meeting.teacherName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{meeting.teacherName}</p>
                    <p className="text-sm text-gray-500">{meeting.teacherEmail}</p>
                  </div>
                </div>

                {/* Meeting info */}
                <div className="mb-3">
                  <p className="font-bold text-lg">{meeting.topic}</p>
                  <p className="text-gray-600"><strong>Course:</strong> {meeting.courseTitle}</p>
                  <p className="text-gray-600"><strong>Start:</strong> {new Date(meeting.start_time).toLocaleString()}</p>
                  <p className="text-gray-600"><strong>Duration:</strong> {meeting.duration} min</p>
                  {activeTab === "upcoming" && (
                    <p className="text-orange-500 font-semibold">Starts in: {getCountdown(meeting.start_time)}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2">
                  {status !== "Completed" && (
                    <button
                      onClick={() => openZoomMeeting(meeting.join_url)}
                      className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition font-semibold"
                    >
                      Join Zoom
                    </button>
                  )}
                  <button
                    onClick={() => copyToClipboard(meeting.join_url)}
                    className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition flex items-center justify-center gap-2"
                  >
                    <FaCopy /> Copy URL
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for selected day */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="max-w-3xl mx-auto my-20 bg-white p-6 rounded-lg shadow-xl outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h2 className="text-2xl font-semibold mb-4">
          Meetings on {selectedDate.toDateString()}
        </h2>
        {meetingsForDay.length === 0 ? (
          <p>No meetings on this day.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {meetingsForDay.map((meeting) => {
              const status = getMeetingStatus(meeting.start_time, meeting.duration);
              return (
                <div
                  key={meeting.meetingId || meeting._id}
                  className="border shadow-lg p-4 rounded-lg flex flex-col gap-2 bg-white hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(status)}`}>
                      {status}
                    </span>
                  </div>
                  <p className="font-semibold">{meeting.topic}</p>
                  <p><strong>Course:</strong> {meeting.courseTitle}</p>
                  <p><strong>Teacher:</strong> {meeting.teacherName}</p>
                  <p><strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleTimeString()}</p>
                  <p><strong>Duration:</strong> {meeting.duration} min</p>
                  {status !== "Completed" && (
                    <p className="text-orange-600 font-semibold">Starts in: {getCountdown(meeting.start_time)}</p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {status !== "Completed" && (
                      <button
                        onClick={() => openZoomMeeting(meeting.join_url)}
                        className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
                      >
                        Join Zoom
                      </button>
                    )}
                    <button
                      onClick={() => copyToClipboard(meeting.join_url)}
                      className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400 transition flex items-center justify-center gap-2"
                    >
                      <FaCopy /> Copy URL
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <button
          onClick={() => setModalIsOpen(false)}
          className="mt-4 bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default MyLearning;
// import React, { useEffect, useState } from "react";
// import Course from "./Course";
// import axios from "axios";

// const MyLearning = () => {
//   const [myLearning, setMyLearning] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEnrolledCourses = async () => {
//       try {
//         const res = await axios.get("/api/purchased-courses", {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });

//         // Extract course objects
//         const courses = res.data.purchasedCourse.map(pc => pc.courseId);
//         setMyLearning(courses);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEnrolledCourses();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
//       <h1 className="font-bold text-2xl">MY LEARNING</h1>
//       <div className="my-5">
//         {loading ? (
//           <MyLearningSkeleton />
//         ) : myLearning.length === 0 ? (
//           <p>You are not enrolled in any course.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {myLearning.map((course, index) => (
//               <Course key={index} course={course} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLearning;

// const MyLearningSkeleton = () => (
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//     {[...Array(3)].map((_, index) => (
//       <div
//         key={index}
//         className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
//       ></div>
//     ))}
//   </div>
// );


