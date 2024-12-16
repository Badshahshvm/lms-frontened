import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash, Edit } from "lucide-react";

const CourseTable = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const token = localStorage.getItem("token");
  const getAllcourses = () => {
    axios
      .get("https://lms-2-mdw9.onrender.com/api/v1/course/admin", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token for authentication
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      })
      .then((res) => {
        setCourse(res.data.courses);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
          `https://lms-2-mdw9.onrender.com/api/v1/course/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("Course deleted successfully!");
          // Optionally, refresh the course list or update state
        } else {
          alert("Failed to delete course.");
        }
      } catch (error) {
        console.error("Error deleting course:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getAllcourses();
  }, []);
  return (
    <div>
      <Button onClick={() => navigate("/admin/course-create")}>
        Create a new Course
      </Button>
      <Table>
        <TableCaption>A list of your recent Courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {course.map((c, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">
                {c.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge>{c.isPublished ? "Published" : "Draft"}</Badge>
              </TableCell>
              <TableCell>{c.courseTitle} </TableCell>
              <TableCell className="text-right gap-2 flex justify-end items-center">
                {/* Edit Button */}
                <Button
                  onClick={() =>
                    navigate(`/admin/course/${c._id}`, { state: { course: c } })
                  }
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>

                {/* Delete Button */}
                <Button
                  onClick={() => handleDelete(c._id)} // Add the delete functionality here
                  variant="destructive"
                  className="flex items-center gap-1"
                >
                  <Trash className="w-3 h-5" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
