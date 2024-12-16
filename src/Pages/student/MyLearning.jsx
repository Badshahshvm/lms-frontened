// import React from "react";
// import MyLearningSkelton from "./MyLearningSkelton";
// import Course from "./Course";
// const MyLearning = () => {
//   const isLoading = false; // Simulate loading state
//   const myLearningCourses = [1, 2]; // Simulate course data

//   return (
//     <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
//       {/* Heading */}
//       <h1 className="font-bold text-2xl">MY LEARNING</h1>

//       <div className="my-5">
//         {isLoading ? (
//           <MyLearningSkelton />
//         ) : myLearningCourses.length === 0 ? (
//           <p className="text-gray-500">You are not enrolled in any courses.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {myLearningCourses.map((course, index) => (
//               <Course key={index} course={course} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyLearning;
import React, { useState, useEffect } from "react";
import axios from "axios";
import MyLearningSkelton from "./MyLearningSkelton";
import Course from "./Course";

const MyLearning = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [myLearningCourses, setMyLearningCourses] = useState([]); // State for storing course data
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        setIsLoading(true); // Start loading
        // Make an API call to fetch enrolled courses
        const response = await axios.get(
          "https://lms-2-mdw9.onrender.com/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Replace with actual API endpoint
        console.log(response.data);
        setUser(response.data.user);
        setMyLearningCourses(response.data.user.enrolledCourses); // Assuming the API response has a `courses`
        // field
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch courses");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchCourses();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      {/* Heading */}
      <h1 className="font-bold text-2xl">MY LEARNING</h1>

      <div className="my-5">
        {isLoading ? (
          <MyLearningSkelton /> // Display skeleton while loading
        ) : error ? (
          <p className="text-red-500">Error: {error}</p> // Display error message
        ) : myLearningCourses.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any courses.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearningCourses.map((course, i) => (
              <Course key={i} course={course} /> // Use unique `_id` as the key
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
