// src/pages/admin/dashboard/Dashboard.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetMeetingsQuery } from "@/features/api/courseApi"; // Assume backend has this API
import { Link } from "react-router-dom";

const Dashboardz = () => {
  const { user } = useSelector((store) => store.auth);
  const { data: meetings, isLoading, error } = useGetMeetingsQuery();

  if (isLoading) return <p>Loading meetings...</p>;
  if (error) return <p>Error loading meetings</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      {user.role === "instructor" && (
        <Link
          to="/admin/lecture/create-zoom"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Create Zoom Meeting
        </Link>
      )}

      <h2 className="text-xl mt-6 mb-3">Upcoming Meetings</h2>
      <ul>
        {meetings?.map((meeting) => (
          <li key={meeting.id} className="mb-2">
            <strong>{meeting.topic}</strong> - {new Date(meeting.start_time).toLocaleString()}
            <Link
              to={`/lecture/meeting-info/${meeting.id}`}
              className="ml-4 text-blue-600 hover:underline"
            >
              Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboardz;
