import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex">
      <div className="hidden lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
        <div className="space-y-4 ">
          <Link to="dashboard" className="flex items-center gap-2">
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link to="course" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
          <Link to="course/createZoom" className="flex items-center gap-2">
            <SquareLibrary size={22} />
            <h1>Create Courses</h1>
            
          </Link>
          <Link to="create-zoom" className="flex items-center gap-2">
             <img src="https://cdn.prod.website-files.com/61120cb2509e012d40f0b214/66a900b7ac9c3aafd4041b98_How%20to%20Mute%20Zoom%20Meetings.png" height={50} width={100} />
            
          </Link>
        </div>
      </div>
    <div className="flex-1 p-10 ">
        <Outlet/>
      </div>
    </div>
  );
};

export default Sidebar;
