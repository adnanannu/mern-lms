import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const MeetingInfo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No meeting data available.</h2>
        <button onClick={() => navigate("/admin/course/createZoom")}>Go Back</button>
      </div>
    );
  }

  const { join_url, start_url, topic, start_time } = state;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>🎥 Zoom Meeting Info</h2>
      <p><strong>📌 Topic:</strong> {topic}</p>
      <p><strong>🕒 Start Time:</strong> {new Date(start_time).toLocaleString()}</p>

      <div style={{ margin: "20px 0" }}>
        <p><strong>🧑‍💼 Start URL (for Host):</strong></p>
        <input type="text" value={start_url} readOnly style={{ width: "100%" }} />
        <button onClick={() => copyToClipboard(start_url)} style={{ marginTop: "5px" }}>
          Copy Start URL
        </button>
      </div>

      <div style={{ margin: "20px 0" }}>
        <p><strong>👨‍🏫 Join URL (for Students):</strong></p>
        <input type="text" value={join_url} readOnly style={{ width: "100%" }} />
        <button onClick={() => copyToClipboard(join_url)} style={{ marginTop: "5px" }}>
          Copy Join URL
        </button>
      </div>

      <button onClick={() => navigate("/admin/course/createZoom")}>Create Another Meeting</button>
    </div>
  );
};

export default MeetingInfo;
