// App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

// Student Pages
import Login from "./pages/Login";
import HeroSection from "./pages/student/HeroSection";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";

// Admin Pages
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";

// Zoom Pages
import ZoomMeetings from "./pages/zoom/ZoomMeetings";
import CreateZoomClass from "./pages/zoom/CreateZoomClass";

// SuperAdmin Page
import SuperAdminDashboard from "./pages/SuperAdminDashboard";

// Protected Routes
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
  SuperAdminRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";

// Theme
import { ThemeProvider } from "./components/ThemeProvider";
import HomePage from "./pages/HomePage";

// ------------------- ROUTER CONFIGURATION -------------------
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // ---------- PUBLIC ROUTES ----------
      {
        path: "/",
        element: (
          <>
            <HomePage/>
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },

      // ---------- STUDENT ROUTES ----------
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },

      // ---------- SUPERADMIN ROUTES ----------
      {
        path: "superadmin-dashboard",
        element: (
          <SuperAdminRoute>
            <SuperAdminDashboard />
          </SuperAdminRoute>
        ),
      },

      // ---------- ADMIN ROUTES ----------
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "course", element: <CourseTable /> },
          { path: "course/create", element: <AddCourse /> },
          { path: "course/:courseId", element: <EditCourse /> },
          { path: "course/:courseId/lecture", element: <CreateLecture /> },
          { path: "course/:courseId/lecture/:lectureId", element: <EditLecture /> },
          { path: "course/:courseId/zoom-class", element: <CreateZoomClass /> },
          { path: "create-zoom", element: <CreateZoomClass /> },
          { path: "zoom-meetings", element: <ZoomMeetings /> },
        ],
      },
    ],
  },
]);

// ------------------- MAIN APP COMPONENT -------------------
function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
