// routes/test.route.js
import express from "express";
import { createZoomMeeting } from "../controllers/zoom.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Test route without auth
router.get("/zoom-test", async (req, res) => {
  try {
    const fakeReq = {
      id: "675d5f86f84281c42b92ef27", // instructor ID
      body: {
        topic: "Test Zoom Class",
        start_time: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes later
        duration: 60,
        courseId: "67648dbcd83a1985170a97b3",
      },
    };
    const fakeRes = {
      status: (code) => ({
        json: (data) => {
          console.log("Fake Response:", data);
          res.status(code).json(data);
        },
      }),
    };

    await createZoomMeeting(fakeReq, fakeRes);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Test failed" });
  }
});

export default router;
