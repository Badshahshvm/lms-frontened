import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./Pages/Login";

import Hero from "./Pages/student/Hero";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import CourseContainer from "./Pages/student/CourseContainer";
import MyLearning from "./Pages/student/MyLearning";
import Profile from "./Pages/student/Profile";
import Sidebar from "./Pages/admin/Sidebar";
import Dashboard from "./Pages/admin/Dashboard";
import CourseTable from "./Pages/admin/course/CourseTable";
import AddCourse from "./Pages/admin/course/AddCourse";
import EditCourse from "./Pages/admin/course/EditCourse";
import CreateLecture from "./Pages/admin/lecture/CreateLecture";
import EditLecture from "./Pages/admin/lecture/EditLecture";
import CourseDetails from "./Pages/student/CourseDetails";
import CourseProgress from "./Pages/student/CourseProgress";
import SerachPage from "./Pages/student/SerachPage";
import { ThemeProvider } from "./components/ThemeProvider";
import SearchCourse from "./Pages/student/SearchCourse";

// Import Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <Hero />
            <CourseContainer />
          </>
        ),
      },
      {
        path: "course/search",
        element: <SerachPage />,
      },
      {
        path: "course/explore",
        element: <SearchCourse />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: <MyLearning />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "course-details/:courseId",
        element: <CourseDetails />,
      },
      {
        path: "course-progress/:courseId",
        element: <CourseProgress />,
      },
      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "courses",
            element: <CourseTable />,
          },
          {
            path: "course-create",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/edit-lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        {/* Add Router Provider */}
        <RouterProvider router={appRouter} />
        {/* Add ToastContainer */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme="colored" // Adjust theme: "light", "dark", or "colored"
        />
      </ThemeProvider>
    </>
  );
}

export default App;
