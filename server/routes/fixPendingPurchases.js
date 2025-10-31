import mongoose from "mongoose";
import dotenv from "dotenv";
import { CoursePurchase } from "./models/coursePurchase.model.js";
import { User } from "./models/user.model.js";
import { Course } from "./models/course.model.js";

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const fixPendingPurchases = async () => {
  try {
    // Fetch all pending purchases
    const pendingPurchases = await CoursePurchase.find({ status: "pending" });

    for (const purchase of pendingPurchases) {
      // Update purchase status to completed
      purchase.status = "completed";
      await purchase.save();

      // Add course to user's enrolledCourses
      await User.findByIdAndUpdate(
        purchase.userId,
        { $addToSet: { enrolledCourses: purchase.courseId } },
        { new: true }
      );

      // Add user to course's enrolledStudents
      await Course.findByIdAndUpdate(
        purchase.courseId,
        { $addToSet: { enrolledStudents: purchase.userId } },
        { new: true }
      );

      console.log(
        `✅ Updated purchase ${purchase._id} | User ${purchase.userId} enrolled in Course ${purchase.courseId}`
      );
    }

    console.log(`\nAll pending purchases fixed!`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating pending purchases:", error);
    process.exit(1);
  }
};

fixPendingPurchases();
