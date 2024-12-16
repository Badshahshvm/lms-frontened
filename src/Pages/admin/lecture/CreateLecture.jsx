import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Trash, Edit } from "lucide-react";
const CreateLecture = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // Get courseId from route params
  const [lectureTitle, setLectureTitle] = useState("");
  const [video, setVideo] = useState(null); // State to store video file
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [lectures, setLectures] = useState([]); // State for lectures

  const getAllCourseLecture = () => {
    const token = localStorage.getItem("token");

    axios
      .get(
        `https://lms-2-mdw9.onrender.com/api/v1/course/lecture/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLectures(res.data.lectures || []);
      })
      .catch((err) => {
        console.error("Error fetching lectures:", err.message);
      });
  };

  useEffect(() => {
    getAllCourseLecture();
  }, []);

  const createLectureHandler = async () => {
    if (!lectureTitle || !video) {
      alert("Please provide both a lecture title and a video.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      // Append lecture details to the form data
      formData.append("lectureTitle", lectureTitle);
      formData.append("video", video);

      // Send POST request to add lecture
      const response = await axios.post(
        `https://lms-2-mdw9.onrender.com/api/v1/course/add/lecture/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Lecture created successfully!");
      getAllCourseLecture(); // Refresh the lecture list
      setLectureTitle("");
      setVideo(null);
    } catch (error) {
      console.error("Error creating lecture:", error.message);
      alert("Failed to create the lecture. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (lectureId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.delete(
          `https://lms-2-mdw9.onrender.com/api/v1/course/delete/${courseId}/${lectureId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          alert("Lecture deleted successfully!");
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

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setVideo(file); // Set the video file in state
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Add Lecture and Some Basic Details
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni,
          debitis.
        </p>
      </div>
      <div className="space-y-4">
        {/* Lecture Title */}
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your lecture title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        {/* Video Upload */}
        <div>
          <Label>Upload Video</Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler} // Handle file upload
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate(-1)}>Back to Course</Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
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

        {/* Lectures List */}
        <div className="mt-10">
          {lectures.length > 0 ? (
            <div>
              <h2 className="font-bold text-lg mb-4">Lectures:</h2>
              <ul className="space-y-2">
                {lectures.map((lecture, index) => (
                  <li
                    key={lecture._id}
                    className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>
                          {index + 1}. {lecture.lectureTitle}
                        </strong>
                      </p>
                      <a
                        href={lecture.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Watch Video
                      </a>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/admin/course/${courseId}/edit-lecture/${lecture._id}`,
                          { state: { lecture: lecture } }
                        )
                      }
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(lecture._id)} // Add the delete functionality here
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      <Trash className="w-3 h-5" />
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No lectures here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
