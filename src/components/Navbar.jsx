import React, { useState, useEffect } from "react";
import { School, AlignEndHorizontal } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DarkMode from "@/DarkMode";
import MobileNv from "./MobileNv";

const Navbar = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get(
        "https://lms-2-mdw9.onrender.com/api/v1/auth/logout",
        // "http://localhost:4000/api/v1/auth/logout",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("photoUrl");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");

      setUser(false);
      navigate("/login"); // Navigate to the login page after logout
      console.log("Successfully logged out");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop Navbar */}
      <div className="hidden md:flex max-w-7xl mx-auto px-4 justify-between items-center h-full">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          {/* <School size={30} /> */}
          <AlignEndHorizontal size={30} />

          <h1 className="hidden md:block font-extrabold text-2xl ml-2">
            TeaWithCode
          </h1>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src={localStorage.getItem("photoUrl")}
                      alt="@user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {localStorage.getItem("role") === "student" && (
                    <DropdownMenuItem onClick={() => navigate("/my-learning")}>
                      My Learning
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem onClick={() => navigate("/courses")}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator /> */}
                  {localStorage.getItem("role") === "instructor" && (
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Dashboard
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-red-600"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* DarkMode toggle for logged-in user */}
              <DarkMode />
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button variant="default" onClick={() => navigate("/signup")}>
                Signup
              </Button>
              {/* DarkMode toggle for logged-out user */}
              <DarkMode />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1
          className="font-extrabold text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          TeaWithCode
        </h1>
        <MobileNv />
        {/* DarkMode toggle for mobile view */}
      </div>
    </div>
  );
};

export default Navbar;
