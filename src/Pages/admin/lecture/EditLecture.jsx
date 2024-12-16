import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import axios from "axios";

const EditLecture = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lecture = location.state?.lecture;

  const [lectureTitle, setLectureTitle] = useState(lecture?.lectureTitle || "");
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const updateLectureHandler = async () => {
    if (!lectureTitle) {
      alert("Please provide a lecture title.");
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("lectureTitle", lectureTitle);
      if (video) formData.append("video", video);

      const response = await axios.put(
        `https://lms-2-mdw9.onrender.com/api/v1/course/update/lecture/${lecture._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Lecture updated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Error updating lecture:", error.message);
      alert("Failed to update the lecture. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">Edit Lecture</h1>
        <p>
          Update the lecture title or upload a new video. Leave the video field
          empty to keep the current video.
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your lecture title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        {lecture?.videoUrl && (
          <div className="mt-4">
            <Label>Current Video</Label>
            <video
              src={lecture.videoUrl}
              controls
              className="w-full max-h-60 rounded-md shadow-md"
            />
          </div>
        )}
        <div>
          <Label>Upload New Video (Optional)</Label>
          <Input type="file" accept="video/*" onChange={fileChangeHandler} />
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Button disabled={isLoading} onClick={updateLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
