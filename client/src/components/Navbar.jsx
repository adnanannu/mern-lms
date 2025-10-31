import { Menu, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import img from '/z.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [searchQuery, setSearchQuery] = useState(""); // Added searchQuery state
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  const searchHandler = (e) => {
    e.preventDefault();
    // Navigate to the search results page with the query
    navigate(`/course/search?query=${searchQuery}`);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img src={img} alt="" height={10} width={60} style={{marginLeft:"20px"}}/>
            
          </Link>
          
          {/* Search Form in Navbar */}
          <button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white text-grey-500 px-5 py-2 rounded-full hover:bg-gray-200"
            style={{marginLeft:"200px"}}
          >
            Explore 
          </button>
          <div></div>
          <form
  onSubmit={searchHandler}
  className="flex items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-2xl mx-auto"
  style={{width:"500px"}}
>
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search Courses"
    className="flex-grow border-none px-6 py-3 text-gray-900 placeholder-gray-400 focus:ring-0"
  />
  <button
    type="submit"
    className="bg-orange-500 text-white px-6 py-3 rounded-r-full hover:bg-black"
  >
    Search
  </button>
</form>

          
        </div>

        {/* User icons and dark mode icon */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <div style={{ marginRight: "20px" }}>
                {/* <nav className="flex items-center gap-6">
                  <Link to="/" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">contact</Link>
                  <Link to="/about" className="text-gray-800 dark:text-gray-200 hover:text-blue-500">About</Link>
                </nav> */}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/login")}>Signup</Button>
              </div>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">tuttors</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
