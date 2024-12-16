// import React, { useState } from "react";
// import Filter from "./Filter";
// import SearchSkelton from "./SearchSkelton";
// import CourseNotFound from "./CourseNotFound";
// import SearchResult from "./SearchResult";
// import { Link, useSearchParams } from "react-router-dom";
// import axios from "axios";
// const SerachPage = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("query");
//   const isLoading = false;
//   const isEmpty = false;
//   const [selectedCaegory, setSelectedCategory] = useState([]);
//   const [selectPrice, setPrice] = useState("");

//   const filterCourse = () => {
//     const token = localStorage.getItem("token");
//     axios.get(`http://localhost:4000/api/v1/course/search`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };
//   const handleFilterChange = (categories, price) => {
//     setSelectedCategory(categories);
//     setPrice(price);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-8 mt-10">
//       <div className="my-6">
//         <h1 className="font-bold text-xl md:text-2xl">result for "{query}"</h1>
//         <p>
//           Showing results for{" "}
//           <span className="text-blue-700 font-bold">ft</span>
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row gap-10">
//         <Filter handleFilterChange={handleFilterChange} />
//         <div className="flex-1">
//           {isLoading ? (
//             Array.from({ length: 3 }).map((_, idx) => {
//               <SearchSkelton />;
//             })
//           ) : isEmpty ? (
//             <CourseNotFound />
//           ) : (
//             [1, 2, 3].map((course) => <SearchResult />)
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SerachPage;
import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import { AlertCircle } from "lucide-react";
import SearchSkelton from "./SearchSkelton";
import CourseNotFound from "./CourseNotFound";
import SearchResult from "./SearchResult";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  // Function to fetch search results from the backend
  const fetchCourses = async () => {
    setIsLoading(true);
    setIsEmpty(false);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://lms-2-mdw9.onrender.com/api/v1/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query,
            categories: selectedCategory.join(","),
            price: selectedPrice,
            // query: "javascript",
            // categories: ["frontend development"],
            // price: "low",
          },
        }
      );

      console.log(response.data);
      if (response.data && response.data.courses.length > 0) {
        setCourses(response.data.courses);
      } else {
        setIsEmpty(true);
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setIsEmpty(true);
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch results on component mount and whenever filters change
  useEffect(() => {
    if (query) {
      fetchCourses();
    }
  }, [query, selectedCategory, selectedPrice]);

  // Handle changes in filters
  const handleFilterChange = (categories, price) => {
    setSelectedCategory(categories);
    setSelectedPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-10">
      <div className="my-6">
        <h1 className="font-bold text-xl md:text-2xl">Results for "{query}"</h1>
        <p>
          Showing results for{" "}
          <span className="text-blue-700 font-bold">{query}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filter Component */}
        <Filter handleFilterChange={handleFilterChange} />

        {/* Search Results */}
        <div className="flex-1">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 3 }).map((_, idx) => (
              <SearchSkelton key={idx} />
            ))
          ) : isEmpty ? (
            // Show "not found" component if no courses found
            <CourseNotFound />
          ) : (
            // Render search results
            courses.map((course) => (
              <SearchResult key={course.id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
