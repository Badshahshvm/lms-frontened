import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row w-full gap-4 md:w-auto"
      >
        <img
          src={course.courseThumbnailUrl}
          alt=""
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="foont-bold text-lg md:text-xl">{course.courseTile}</h1>
          <p>{course.subTitle}</p>
          <p>Instructor:{course.creator.name}</p>
          <Badge className="w-fit mt-2 md:mt-0">{course.courseLevel}</Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl">₹ {course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
