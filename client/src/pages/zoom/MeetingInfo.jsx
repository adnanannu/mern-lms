// src/pages/admin/lecture/MeetingInfo.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { useGetMeetingQuery } from "@/features/api/courseApi";

const MeetingInfo = () => {
  const { id } = useParams();
  const { data: meeting, isLoading, error } = useGetMeetingQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading meeting info</p>;

  return (
    <div className="p-5 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-3">{meeting.topic}</h2>
      <p>
        <strong>Start Time:</strong> {new Date(meeting.start_time).toLocaleString()}
      </p>
      <p>
        <strong>Duration:</strong> {meeting.duration} mins
      </p>
      <p>
        <strong>Join URL:</strong>{" "}
        <a href={meeting.join_url} target="_blank" className="text-blue-600">
          Click to Join
        </a>
      </p>
    </div>
  );
};

export default MeetingInfo;
