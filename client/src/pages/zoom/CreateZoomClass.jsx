import React, { useState } from "react";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { useCreateZoomMeetingMutation } from "@/features/api/zoomApi";

const CreateZoomClass = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [topic, setTopic] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [meetingInfo, setMeetingInfo] = useState(null);

  const { data: coursesData, isLoading: coursesLoading, error: coursesError } =
    useGetCreatorCourseQuery();

  const [createZoomMeeting, { isLoading: creating, error: createError }] =
    useCreateZoomMeetingMutation();

  const handleCreateMeeting = async () => {
    if (!selectedCourse || !topic || !startTime || !duration) {
      alert("Please fill all fields before creating the Zoom meeting.");
      return;
    }

    try {
      const response = await createZoomMeeting({
        courseId: selectedCourse,
        topic,
        start_time: new Date(startTime).toISOString(),
        duration,
      }).unwrap();

      setMeetingInfo(response.meeting);
    } catch (err) {
      console.error(err);
      alert("Failed to create Zoom meeting.");
    }
  };

  const teacherCourses = coursesData?.courses || [];

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Create Zoom Class
      </h1>

      <div className="bg-white shadow-xl rounded-xl p-6">
        {coursesLoading && <p className="text-gray-500">Loading your courses...</p>}
        {coursesError && <p className="text-red-500">Failed to load courses.</p>}

        {!coursesLoading && !coursesError && (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col text-gray-700 font-medium">
              Select Course:
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">-- Select Course --</option>
                {teacherCourses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseTitle}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col text-gray-700 font-medium">
              Topic:
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter meeting topic"
                className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-medium">
              Start Time:
              <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <label className="flex flex-col text-gray-700 font-medium">
              Duration (minutes):
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>

            <button
              onClick={handleCreateMeeting}
              disabled={creating}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold p-3 rounded-lg mt-4 shadow-md transition duration-200"
            >
              {creating ? "Creating..." : "Create Zoom Meeting"}
            </button>

            {createError && (
              <p className="text-red-500 mt-2 font-medium">Error creating meeting.</p>
            )}

            {meetingInfo && (
              <div className="mt-6 p-6 border rounded-xl bg-orange-50 shadow-md space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Meeting Details</h2>
                <p><strong>Topic:</strong> {meetingInfo.topic}</p>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(meetingInfo.start_time).toLocaleString()}
                </p>
                <p><strong>Duration:</strong> {meetingInfo.duration} minutes</p>

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <a
                    href={meetingInfo.start_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-lg font-semibold text-center flex-1 shadow-md transition duration-200"
                  >
                    Join as Teacher
                  </a>
                  <a
                    href={meetingInfo.join_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-lg font-semibold text-center flex-1 shadow-md transition duration-200"
                  >
                    Share with Students
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateZoomClass;
