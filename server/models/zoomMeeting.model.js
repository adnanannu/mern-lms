import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema({
  topic: String,
  start_time: Date,
  duration: Number,
  start_url: String,
  join_url: String,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export const Meeting = mongoose.model("Meeting", meetingSchema);
