import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "@/components/ui/badge"; // Assuming you're using a Badge component

const SearchCourse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://lms-2-mdw9.onrender.com/api/v1/course/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.courses || []);
      console.log(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch courses when the component mounts
  useEffect(() => {
    getAllCourses();
  }, []);

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  if (courses.length === 0) {
    return <div>No courses found.</div>;
  }

  return (
    <div className="m-6 p-6 flex flex-col gap-6 bg-gray-50 dark:bg-gray-800 dark:text-white rounded shadow-md mt-10">
      {courses.map((course) => (
        <div
          key={course._id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 dark:border-gray-700 py-4 gap-4 mt-10"
        >
          {/* Course Details */}
          <Link
            to={`/course-details/${course._id}`}
            className="flex flex-col md:flex-row w-full gap-4 md:w-auto"
          >
            <img
              src={course.courseThumbnailUrl}
              alt={course.courseTitle}
              className="h-32 w-full md:w-56 object-cover rounded"
            />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-lg md:text-xl">
                {course.courseTitle}
              </h1>
              <p>{course.subTitle}</p>
              <p>Instructor: {course.creator?.name || "N/A"}</p>
              <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
            </div>
          </Link>
          {/* Course Price */}
          <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
            <h1 className="font-bold text-lg md:text-xl">
              ₹ {course.coursePrice}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCourse;
