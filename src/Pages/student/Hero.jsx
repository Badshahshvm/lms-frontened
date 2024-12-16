// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const Hero = () => {
//   const [searchQuery, setSearchQuery] = useState(""); // Correct state definition
//   const navigate = useNavigate(); // Correct import and usage

//   const searchHandler = (e) => {
//     e.preventDefault();

//     // Navigate to the search page only if there is a valid query
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     } else {
//       alert("Please enter a search term."); // Add user feedback if empty
//     }
//   };

//   return (
//     <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-white text-4xl font-bold mb-4">
//           Find the Best Courses for You
//         </h1>
//         <p className="text-gray-200 dark:text-gray-400 mb-8">
//           Discover, Learn, and Upskill with our wide range of courses
//         </p>

//         {/* Search Form */}
//         <form
//           className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
//           onSubmit={searchHandler}
//         >
//           {/* Input Field */}
//           <Input
//             placeholder="Search Courses"
//             className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//             value={searchQuery} // Bind state to input
//             onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
//           />
//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
//           >
//             Search
//           </Button>
//         </form>

//         {/* Explore Courses Button */}
//         <Button
//           className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
//           onClick={() => navigate(`/course/search?query`)}
//         >
//           Explore Courses
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const Hero = () => {
//   const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
//   const navigate = useNavigate(); // For navigation

//   const searchHandler = (e) => {
//     e.preventDefault();

//     // Navigate to the search page with the query
//     if (searchQuery.trim() !== "") {
//       navigate(`/course/search?query=${searchQuery}`);
//     } else {
//       alert("Please enter a search term."); // Alert user if query is empty
//     }
//   };

//   return (
//     <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
//       <div className="max-w-3xl mx-auto">
//         <h1 className="text-white text-4xl font-bold mb-4">
//           Find the Best Courses for You
//         </h1>
//         <p className="text-gray-200 dark:text-gray-400 mb-8">
//           Discover, Learn, and Upskill with our wide range of courses
//         </p>

//         {/* Search Form */}
//         <form
//           className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
//           onSubmit={searchHandler}
//         >
//           {/* Input Field */}
//           <Input
//             placeholder="Search Courses"
//             className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
//             value={searchQuery} // Bind input state
//             onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
//           />
//           {/* Submit Button */}
//           <Button
//             type="submit"
//             className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800"
//           >
//             Search
//           </Button>
//         </form>

//         {/* Explore Courses Button */}
//         <Button
//           className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200"
//           onClick={() => navigate(`/course/search`)} // Navigate to search without query
//         >
//           Explore Courses
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Hero;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import axios from "axios";
import CourseSkelton from "./CourseSkelton";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
  const navigate = useNavigate(); // For navigation
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
      setCourses(response.data.courses);
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

  const searchHandler = (e) => {
    e.preventDefault();

    // Navigate to the search page with the query
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    } else {
      alert("Please enter a search term."); // Alert user if query is empty
    }
  };

  const exploreCoursesHandler = () => {
    // Navigate to the course listing page with all courses passed as state
    navigate("/course/explore");
  };

  return (
    <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Animated Banner Text */}
        <motion.h1
          className="text-white text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }} // Start off slightly transparent and lower
          animate={{ opacity: 1, y: 0 }} // Fade in and slide up
          transition={{ duration: 0.8 }} // Animation duration
        >
          Find the Best Courses for You
        </motion.h1>
        <motion.p
          className="text-gray-200 dark:text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }} // Add delay for staggered animation
        >
          Discover, Learn, and Upskill with our wide range of courses
        </motion.p>

        {/* Search Form */}
        <form
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
          onSubmit={searchHandler}
        >
          {/* Input Field */}
          <Input
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
            value={searchQuery} // Bind input state
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
          />
          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-purple-600 dark:bg-purple-700 text-white px-6 py-3 rounded-r-full hover:bg-purple-700 dark:hover:bg-purple-800"
          >
            Search
          </Button>
        </form>

        {/* Explore Courses Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }} // Stagger animation for the button
        >
          <Button
            className="bg-white dark:bg-gray-800 text-purple-600 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={exploreCoursesHandler} // Call handler on click
          >
            Explore Courses
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
