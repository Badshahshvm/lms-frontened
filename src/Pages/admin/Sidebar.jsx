// import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="flex my-12">
//       <div className="hidden bg-gray-200 lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700  p-5 sticky top-0  h-screen">
//         <div className="space-y-4 ">
//           <Link to="/admin/dashboard" className="flex items-center gap-2">
//             <ChartNoAxesColumn size={22} />
//             <h1>Dashboard</h1>
//           </Link>
//           <Link to="/admin/courses" className="flex items-center gap-2">
//             <SquareLibrary size={22} />
//             <h1>Courses</h1>
//           </Link>
//         </div>
//       </div>
//       <div className="flex-1 p-10 ">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex my-12">
      <div className="hidden bg-gray-200 dark:bg-gray-800 lg:block w-[250px] sm:w-[300px] space-y-8 border-r border-gray-300 dark:border-gray-700 p-5 sticky top-0 h-screen">
        <div className="space-y-4">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <ChartNoAxesColumn size={22} />
            <h1>Dashboard</h1>
          </Link>
          <Link
            to="/admin/courses"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <SquareLibrary size={22} />
            <h1>Courses</h1>
          </Link>
        </div>
      </div>
      <div className="flex-1 p-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
