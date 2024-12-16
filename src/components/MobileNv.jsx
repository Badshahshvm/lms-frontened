// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import DarkMode from "@/DarkMode";

// const MobileNv = () => {
//   const role = localStorage.getItem("role");
//   return (
//     <div>
//       {/* Trigger for opening the navigation */}
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button
//             variant="outline"
//             size="icon"
//             className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//           >
//             <Menu className="h-6 w-6" />
//           </Button>
//         </SheetTrigger>

//         {/* Navigation Content */}
//         <SheetContent className="p-6 flex flex-col gap-6">
//           {/* Header with Title and Dark Mode Toggle */}
//           <SheetHeader className="flex items-center justify-between flex-row mt-2">
//             <SheetTitle className="text-lg font-bold">TeaWithCode</SheetTitle>
//             <DarkMode />
//           </SheetHeader>

//           {/* Navigation Links */}
//           <nav className="flex flex-col gap-4 text-lg">
//             <a
//               href="/my-learning"
//               className="hover:text-white font-semibold hover:border p-2 rounded-lg hover:bg-blue-400"
//             >
//               My Learning
//             </a>
//             <a
//               href="/profile"
//               className="hover:text-white font-semibold hover:border p-2 rounded-lg hover:bg-blue-400"
//             >
//               Profile
//             </a>

//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 window.location.reload();
//               }}
//               className="text-white bg-red-700 font-semibold hover:border p-2 rounded-lg hover:bg-red-600"
//             >
//               Logout
//             </button>
//           </nav>
//           {role === "instructor" && (
//             <div className="mt-auto">
//               <SheetClose asChild>
//                 <Button variant="default" className="w-full">
//                   Dashboard
//                 </Button>
//               </SheetClose>
//             </div>
//           )}

//           {/* Footer (Optional Save Button) */}
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default MobileNv;
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import DarkMode from "@/DarkMode";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate

const MobileNv = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  // Check login state when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(userRole || "");
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <div>
      {/* Trigger for opening the navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        {/* Navigation Content */}
        <SheetContent className="p-6 flex flex-col gap-6">
          {/* Header with Title and Dark Mode Toggle */}
          <SheetHeader className="flex items-center justify-between flex-row mt-2">
            <SheetTitle className="text-lg font-bold">TeaWithCode</SheetTitle>
            <DarkMode />
          </SheetHeader>

          {/* Navigation Links */}
          {isLoggedIn ? (
            <nav className="flex flex-col gap-4 text-lg">
              <Link
                to="/my-learning"
                className="hover:text-white font-semibold hover:border p-2 rounded-lg hover:bg-blue-400"
              >
                My Learning
              </Link>
              <Link
                to="/profile"
                className="hover:text-white font-semibold hover:border p-2 rounded-lg hover:bg-blue-400"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-700 font-semibold hover:border p-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
              {role === "instructor" && (
                <div className="mt-auto">
                  <SheetClose asChild>
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => navigate("/admin/dashboard")} // Navigate to dashboard
                    >
                      Dashboard
                    </Button>
                  </SheetClose>
                </div>
              )}
            </nav>
          ) : (
            <nav className="flex flex-col gap-4 text-lg">
              <Link
                to="/login"
                className="hover:text-white font-semibold hover:border p-2 rounded-lg hover:bg-green-500"
              >
                Register
              </Link>
            </nav>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNv;
