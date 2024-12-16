import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios"; // Import Axios for API requests

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null); // For storing the selected image
  const [preview, setPreview] = useState(null); // For storing the preview URL
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Set the selected image
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const createCourseHandler = async () => {
    // Check if required fields are filled
    if (!courseTitle || !category || !image) {
      alert(
        "Please fill out all fields and upload an image before submitting."
      );
      return;
    }

    setIsLoading(true); // Set loading state to true
    try {
      const token = localStorage.getItem("token"); // Get the auth token
      const formData = new FormData(); // Use FormData for file upload
      formData.append("courseTitle", courseTitle);
      formData.append("category", category);
      formData.append("image", image); // Append the image file

      const response = await axios.post(
        "https://lms-2-mdw9.onrender.com/api/v1/course/new", // Replace with your actual API endpoint
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token for authentication
            "Content-Type": "multipart/form-data", // Set content type for file upload
          },
        }
      );

      console.log(response.data);
      alert("Course created successfully!");
      navigate("/admin/courses"); // Redirect to the course list page
    } catch (error) {
      console.error("Error creating course:", error.message);
      alert("An error occurred while creating the course. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Add Course and Some Basic Details</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni,
          debitis.
        </p>
      </div>
      <div className="space-y-4">
        {/* Course Title */}
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
          />
        </div>

        {/* Course Category */}
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="frontend">Frontend Development</SelectItem>
                <SelectItem value="machine-learning">
                  Machine Learning
                </SelectItem>
                <SelectItem value="ai">Artificial Intelligence</SelectItem>
                <SelectItem value="react">ReactJS</SelectItem>
                <SelectItem value="nextjs">NextJS</SelectItem>
                <SelectItem value="Dockerjs">Docker</SelectItem>
                <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                <SelectItem value="AWS Certification">
                  AWS Certification
                </SelectItem>
                <SelectItem value="Nodejs">Nodejs</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="js">Javascript</SelectItem>
                <SelectItem value="programmng">Programming</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Image Upload */}
        <div>
          <Label>Upload Image</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Course Preview"
                className="w-32 h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            Back
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
