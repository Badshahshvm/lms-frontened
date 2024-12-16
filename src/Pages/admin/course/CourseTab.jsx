import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/TextEditor";
import { Loader2 } from "lucide-react";
import axios from "axios";

const CourseTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    courseTitle: location.state?.course.courseTitle || "",
    subTitle: location.state?.course.subTitle || "",
    description: location.state?.course.description || "",
    category: location.state?.course.category || "",
    courseLevel: location.state?.course.courseLevel || "",
    coursePrice: location.state?.course.coursePrice || "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    location.state?.course.courseThumbnailUrl || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(
    location.state?.course.isPublished ?? true
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const togglePublishHandler = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const courseId = location.state?.course._id;

      const response = await axios.put(
        `https://lms-2-mdw9.onrender.com/api/v1/course/publish/${courseId}?publish=${!isPublished}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsPublished(!isPublished);
      alert(response.data.message || "Course status updated successfully!");
    } catch (error) {
      console.error("Error updating publish status:", error.message);
      alert("Failed to update course status. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const createCourseHandler = async () => {
    if (
      !input.courseTitle ||
      !input.subTitle ||
      !input.description ||
      !input.category ||
      !input.courseLevel ||
      !input.coursePrice ||
      (!image && !previewImage)
    ) {
      alert("Please fill out all fields and upload a thumbnail.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("description", input.description);
      formData.append("category", input.category);
      formData.append("courseLevel", input.courseLevel);
      formData.append("coursePrice", input.coursePrice);

      if (image) {
        formData.append("image", image);
      }

      const url = location.state
        ? `https://lms-2-mdw9.onrender.com/api/v1/course/update/${location.state.course._id}`
        : "https://lms-2-mdw9.onrender.com/api/v1/course/new";

      const response = location.state
        ? await axios.put(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          })
        : await axios.post(url, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });

      navigate("/admin/courses");
      alert(
        location.state
          ? "Course updated successfully!"
          : "Course created successfully!"
      );
    } catch (error) {
      console.error("Error creating/updating course:", error.message);
      alert("Failed to process the course. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>
            {location.state ? "Edit Course" : "Create Course"}
          </CardTitle>
          <CardDescription>
            {location.state
              ? "Update your course details here."
              : "Create a new course."}
          </CardDescription>
        </div>
        {location.state && (
          <Button
            variant="outline"
            onClick={togglePublishHandler}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeHandler}
              placeholder="Ex. Fullstack Developer"
            />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeHandler}
              placeholder="Ex. Become a Fullstack Developer"
            />
          </div>

          <div>
            <Label>Description</Label>
            <TextEditor input={input} setInput={setInput} name="description" />
          </div>

          <div className="flex items-center gap-5">
            <div>
              <Label>Category</Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, category: value })
                }
                value={input.category}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="frontend">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="backend">Backend Development</SelectItem>
                    <SelectItem value="ai">Artificial Intelligence</SelectItem>
                    <SelectItem value="DSA">Programming</SelectItem>
                    <SelectItem value="dev">Development</SelectItem>
                    {/* Other categories */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Course Level</Label>
              <Select
                onValueChange={(value) =>
                  setInput({ ...input, courseLevel: value })
                }
                value={input.courseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Course Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeHandler}
                placeholder="Enter Price"
              />
            </div>
          </div>

          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={fileChangeHandler}
              className="w-fit"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Course Thumbnail Preview"
                  className="h-40 w-40 object-cover rounded"
                />
              </div>
            )}
          </div>

          <div>
            <Button
              variant="outline"
              disabled={isLoading}
              onClick={createCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : location.state ? (
                "Update Course"
              ) : (
                "Create Course"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
