import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CourseTab from "./CourseTab";
const EditCourse = () => {
  const location = useLocation();
  console.log(location.state);
  return (
    <div className="flex-1">
      <div className="flex items-cente justify-between mb-5">
        <h1 className="font-bold text-xl">
          Add Detail information regarding course
        </h1>
        <Link to="lecture">
          <Button>Go to Lecture page</Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
