import axios from "axios";
import { User } from "../models/user.model.js";
import { Course } from "../models/course.model.js";
import dotenv from "dotenv";

dotenv.config();

let zoomAccessToken = null;
let zoomTokenExpiry = 0;

// Get Zoom S2S access token
const getZoomAccessToken = async () => {
  const now = Date.now();
  if (zoomAccessToken && now < zoomTokenExpiry) return zoomAccessToken;

  const credentials = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
  ).toString("base64");

  const res = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
    {},
    {
      headers: { Authorization: `Basic ${credentials}` },
    }
  );

  zoomAccessToken = res.data.access_token;
  zoomTokenExpiry = now + res.data.expires_in * 1000;
  return zoomAccessToken;
};

// Create Zoom meeting
export const createZoomMeeting = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    if (!user || user.role !== "instructor")
      return res.status(403).json({ success: false, message: "Only instructors can create meetings" });

    const { topic, start_time, duration, courseId } = req.body;
    if (!topic || !start_time || !duration || !courseId)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const course = await Course.findById(courseId);
    if (!course || course.creator.toString() !== user._id.toString())
      return res.status(403).json({ success: false, message: "Invalid course" });

    const token = await getZoomAccessToken();

    const zoomRes = await axios.post(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        topic,
        type: 2, // scheduled meeting
        start_time: new Date(start_time).toISOString(),
        duration,
        timezone: "Asia/Dubai",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          waiting_room: true,
          mute_upon_entry: true,
        },
      },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    );

    course.zoomMeetings.push({
      topic: zoomRes.data.topic,
      start_time: zoomRes.data.start_time,
      duration: zoomRes.data.duration,
      join_url: zoomRes.data.join_url,
      start_url: zoomRes.data.start_url,
      meetingId: zoomRes.data.id,
      createdBy: user._id,
    });

    await course.save();

    res.status(201).json({ success: true, meeting: course.zoomMeetings[course.zoomMeetings.length - 1] });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false, message: "Failed to create Zoom meeting" });
  }
};
