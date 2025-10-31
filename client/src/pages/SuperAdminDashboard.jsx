import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
} from "@/features/api/superAdminApi";
import {
  Shield,
  UserCheck,
  UserX,
  Loader2,
  Users,
  GraduationCap,
  Briefcase,
  Menu,
  Moon,
  Sun,
  LogOut,
  Settings,
} from "lucide-react";

const SuperAdminDashboard = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();
  const [changeUserRole, { isLoading: isUpdating }] = useChangeUserRoleMutation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeRole = async (id, newRole) => {
    try {
      await changeUserRole({ id, role: newRole }).unwrap();
      toast.success("User role updated successfully!");
    } catch (err) {
      console.error("changeUserRole error:", err);
      toast.error(err?.data?.message || "Failed to update role");
    }
  };

  const users = data?.users || [];
  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalInstructors = users.filter((u) => u.role === "instructor").length;
  const totalSuperAdmins = users.filter((u) => u.role === "superadmin").length;

  return (
    <div
      className={`flex min-h-screen transition-all ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`${
          menuOpen ? "w-56" : "w-20"
        } transition-all bg-gradient-to-b from-blue-800 to-blue-900 text-white p-5 flex flex-col justify-between`}
      >
        <div>
          <div className="flex items-center justify-between mb-8">
            <Shield className="w-8 h-8 text-white" />
            <button onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-4">
            <button className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded-lg w-full">
              <Users className="w-5 h-5" /> {menuOpen && <span>Users</span>}
            </button>
            <button className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded-lg w-full">
              <Settings className="w-5 h-5" /> {menuOpen && <span>Settings</span>}
            </button>
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded-lg w-full"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {menuOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded-lg w-full">
            <LogOut className="w-5 h-5" /> {menuOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
            <p className="text-sm text-gray-500">
              Manage users and control system roles
            </p>
          </div>
          <div>
            <span className="text-sm font-medium px-4 py-2 rounded-full bg-blue-100 text-blue-700">
              Total Users: {users.length}
            </span>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm">Students</h3>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
              <GraduationCap className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm">Instructors</h3>
                <p className="text-3xl font-bold">{totalInstructors}</p>
              </div>
              <Briefcase className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm">Super Admins</h3>
                <p className="text-3xl font-bold">{totalSuperAdmins}</p>
              </div>
              <Shield className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-700 to-gray-800 text-white rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm">Total Users</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </section>

        {/* Table */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading users. Check console.
          </div>
        ) : (
          <div
            className={`rounded-2xl shadow-lg overflow-hidden ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="w-full border-collapse">
              <thead
                className={`${
                  darkMode ? "bg-blue-900" : "bg-blue-600"
                } text-white`}
              >
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Role</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className={`transition hover:bg-opacity-10 ${
                      darkMode
                        ? "hover:bg-blue-500"
                        : "hover:bg-blue-50 even:bg-gray-50"
                    }`}
                  >
                    <td className="py-3 px-6">{u.name}</td>
                    <td className="py-3 px-6">{u.email}</td>
                    <td className="py-3 px-6 capitalize">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          u.role === "superadmin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "instructor"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center space-x-2">
                      {u.role !== "instructor" && (
                        <Button
                          disabled={isUpdating}
                          onClick={() => handleChangeRole(u._id, "instructor")}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <UserCheck className="w-4 h-4 mr-1" />
                          Make Instructor
                        </Button>
                      )}
                      {u.role !== "student" && (
                        <Button
                          variant="outline"
                          disabled={isUpdating}
                          onClick={() => handleChangeRole(u._id, "student")}
                          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                        >
                          <UserX className="w-4 h-4 mr-1" />
                          Make Student
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">Pending Teacher Requests</h2>
  <div className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"}`}>
    <table className="w-full border-collapse">
      <thead className={`${darkMode ? "bg-blue-900" : "bg-blue-600"} text-white`}>
        <tr>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-left">Email</th>
          <th className="py-3 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.filter(u => u.teacherRequest).length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center py-4">No pending requests</td>
          </tr>
        ) : (
          users.filter(u => u.teacherRequest).map(u => (
            <tr key={u._id} className={`${darkMode ? "hover:bg-blue-500" : "hover:bg-blue-50 even:bg-gray-50"}`}>
              <td className="py-3 px-6">{u.name}</td>
              <td className="py-3 px-6">{u.email}</td>
              <td className="py-3 px-6 text-center">
                <Button
                  disabled={isUpdating}
                  onClick={() => handleChangeRole(u._id, "instructor")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
    
  );
};

export default SuperAdminDashboard;
