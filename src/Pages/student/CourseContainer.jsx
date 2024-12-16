import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "./Course";
import CourseSkelton from "./CourseSkelton";

const CourseContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        // "https://lms-2-mdw9.onrender.com/api/v1/course/all",
        "https://lms-2-mdw9.onrender.com/api/v1/course/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-center text-3xl mb-10">Our Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <CourseSkelton key={i} />)
            : courses
                .filter((course) => course.isPublished)
                .map((course) => <Course key={course._id} course={course} />)}
        </div>
      </div>
    </div>
  );
};

export default CourseContainer;
