// Profile.jsx
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Course from "./Course";
import { toast } from "sonner";
import { useLoadUserQuery, useUpdateUserMutation } from "@/features/api/authApi";
import axios from "axios";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [updateUser, { isLoading: updateUserIsLoading, isError, error, isSuccess }] = useUpdateUserMutation();

  const user = data?.user;

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  const requestTeacherHandler = async () => {
    try {
      await axios.post("/api/user/teacher-request");
      toast.success("Teacher request submitted!");
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to request teacher role");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center mt-20 text-xl font-medium">Profile Loading...</h1>;

  return (
    <div className="max-w-6xl mx-auto px-4 my-10 space-y-8">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 mb-4 ring-4 ring-indigo-500">
            <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt={user?.name || "Profile"} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="text-gray-600"><span className="font-semibold">Role:</span> {user.role.toUpperCase()}</p>

          {/* Edit Profile Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input onChange={onChangeHandler} type="file" accept="image/*" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button disabled={updateUserIsLoading} onClick={updateUserHandler} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  {updateUserIsLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Request Teacher Button */}
          {/* {user.role === "student" && !user.teacherRequest && (
            <Button onClick={requestTeacherHandler} className="mt-2 bg-green-500 hover:bg-green-600 text-white">
              Request to Become Teacher
            </Button>
          )}
          {user.teacherRequest && <p className="text-yellow-600 mt-2">Teacher request pending</p>} */}
        </div>
      </div>

      {/* Courses Section */}
      <div>
        <h1 className="font-semibold text-xl mb-4">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user.enrolledCourses.length === 0 ? (
            <p className="text-gray-500">You haven't enrolled yet</p>
          ) : (
            user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
