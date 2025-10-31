// /pages/admin/ZoomMeetings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

function ZoomMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load existing meetings
  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/zoom/meetings");
      setMeetings(res.data.meetings || []);
    } catch (err) {
      console.error("Error fetching meetings:", err);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Create new Zoom meeting
  const createMeeting = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("http://localhost:5000/api/zoom/create", {
        topic,
        duration,
      });

      if (res.data.success) {
        setSuccess("Zoom meeting created successfully!");
        fetchMeetings();
        setTopic("");
        setDuration(30);
      } else {
        setError(res.data.message || "Failed to create meeting.");
      }
    } catch (err) {
      setError("Error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Zoom Meetings</h2>

      {/* Meeting creation form */}
      <form onSubmit={createMeeting} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-3">
          <label className="block font-medium mb-1">Meeting Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border p-2 w-full rounded"
            placeholder="Enter meeting topic"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 w-full rounded"
            min="10"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* Meeting list */}
      <div>
        <h3 className="text-xl font-semibold mb-3">Existing Meetings</h3>
        {meetings.length === 0 ? (
          <p>No meetings found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Topic</th>
                <th className="border p-2">Join URL</th>
                <th className="border p-2">Start Time</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((m, index) => (
                <tr key={index}>
                  <td className="border p-2">{m.topic}</td>
                  <td className="border p-2">
                    <a
                      href={m.join_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Join Meeting
                    </a>
                  </td>
                  <td className="border p-2">
                    {new Date(m.start_time).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ZoomMeetings;
