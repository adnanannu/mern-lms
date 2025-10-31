import React, { useEffect, useState } from "react";
import axios from "axios";

const ZoomList = ({ courseId }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      const res = await axios.get(`/api/zoom/course/${courseId}`, { withCredentials: true });
      setMeetings(res.data.meetings);
    };
    fetchMeetings();
  }, [courseId]);

  return (
    <div>
      <h2>Upcoming Meetings</h2>
      <ul>
        {meetings.map((m) => (
          <li key={m._id}>
            {m.topic} - {new Date(m.start_time).toLocaleString()} - 
            <a href={m.join_url} target="_blank" rel="noreferrer">Join</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZoomList;
