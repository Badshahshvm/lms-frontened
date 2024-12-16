import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Edit } from "lucide-react"; // Assuming Edit is an icon from lucide-react

const Lecture = ({ lecture, index }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to navigate to the update lecture page
  const goToUpdateLecture = () => {
    navigate(`/admin/course/${lecture._id}`, {
      state: { lecture }, // Pass lecture data via state
    });
  };

  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-2 rounded-md my-2">
      <h1 className="font-bold text-gray-800 dark:text-gray-100">
        {lecture.lectureTitle}
      </h1>
      {/* Edit icon with click handler */}
      <Edit
        className="cursor-pointer text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        size={20}
        onClick={goToUpdateLecture} // Attach the navigation function to onClick
      />
    </div>
  );
};

export default Lecture;
