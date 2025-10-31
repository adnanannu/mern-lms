import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateMeeting = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    topic: "",
    start_time: "",
    duration: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch courses created by the logged-in instructor
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/api/courses/my-courses"); // Adjust route to your API
        setCourses(data.courses || []);
      } catch (error) {
        console.error(
          "Failed to fetch courses:",
          error.response?.data || error.message
        );
        setMessage("Failed to load courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.course) {
      setMessage("Please select a course");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("/api/zoom/create", formData);
      setMessage(
        `Meeting created successfully! Join URL: ${data.meeting.join_url}`
      );
      setFormData({
        topic: "",
        start_time: "",
        duration: "",
        course: "",
      });
    } catch (error) {
      console.error(
        "Zoom Create Meeting Error:",
        error.response?.data || error.message
      );
      setMessage("Failed to create meeting. See console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create Zoom Meeting  gg
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Select */}
        <div>
          <label className="block font-medium mb-1">Select Course:</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.courseTitle}
              </option>
            ))}
          </select>
        </div>

        {/* Meeting Topic */}
        <div>
          <label className="block font-medium mb-1">Meeting Topic:</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter meeting topic"
            required
          />
        </div>

        {/* Start Time */}
        <div>
          <label className="block font-medium mb-1">Start Time:</label>
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block font-medium mb-1">Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter duration in minutes"
            required
            min={1}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Meeting"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-red-500 break-words">{message}</p>
      )}
    </div>
  );
};

export default CreateMeeting;