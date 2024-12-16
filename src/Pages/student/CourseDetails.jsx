// // import React, { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import ReactPlayer from "react-player";
// // import { useNavigate, useParams } from "react-router-dom";
// // import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// // import axios from "axios";
// // const CourseDetails = () => {
// //   const params = useParams();
// //   const courseId = params.courseId;
// //   const [course, setCourse] = useState({});
// //   const [creator, setCreator] = useState({});
// //   const getCourseDetails = () => {
// //     const token = localStorage.getItem("token");
// //     axios
// //       .get(`http://localhost:4000/api/v1/course/${courseId}`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       })
// //       .then((res) => {
// //         console.log(res.data);
// //         setCreator(res.data.course.creator);
// //         setCourse(res.data.course);
// //       })
// //       .catch((err) => console.log(err));
// //   };
// //   useEffect(() => {
// //     getCourseDetails();
// //   }, []);
// //   return (
// //     <div className="mt-20 space-y-5">
// //       <div className="bg-[#2D2F31] text-white">
// //         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
// //           <h1 className="font-bold text-2xl md:text-3xl">
// //             {course.courseTitle}
// //           </h1>
// //           <p className="text-base md:text-lg">{course.subTitle}</p>
// //           <p>
// //             Created By{" "}
// //             <span className="text-blue-200 underline italic">
// //               {" "}
// //               {creator.name}
// //             </span>
// //             <div className="flex items-center gap-2 text-sm">
// //               <BadgeInfo size={16} />
// //               <p>last updated 8-12-2024</p>
// //             </div>
// //             <p> Students enrolled : </p>
// //           </p>
// //         </div>
// //       </div>
// //       <div className="flex max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
// //               <div className="w-full lg:w-1/2 space-y-5">
// //               <h1  className="font-bold text-xl md:text-2xl">Description</h1>
// //               <p
// //             className="text-sm"
// //             dangerouslySetInnerHTML={{ __html: course.description }}
// //           />
// //            <Card>
// //             <CardHeader>
// //               <CardTitle>Course Content</CardTitle>
// //               <CardDescription>{course.lectures.length} lectures</CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-3">
// //               {course.lectures.map((lecture, idx) => (
// //                 <div key={idx} className="flex items-center gap-3 text-sm">
// //                   <span>
// //                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
// //                   </span>
// //                   <p>{lecture.lectureTitle}</p>
// //                 </div>
// //               ))}
// //             </CardContent>
// //           </Card></div>
// //           <div className="w-full lg:w-1/3">
// //           <Card>
// //             <CardContent className="p-4 flex flex-col">
// //               <div className="w-full aspect-video mb-4">
// //                 <ReactPlayer
// //                   width="100%"
// //                   height={"100%"}
// //                   url={course.lectures[0].videoUrl}
// //                   controls={true}
// //                 />
// //               </div>
// //               <h1>Lecture title</h1>
// //               <Separator className="my-2" />
// //               <h1 className="text-lg md:text-xl font-semibold">Course Price</h1>
// //             </CardContent>
// //             <CardFooter className="flex justify-center p-4">
// //               {purchased ? (
// //                 <Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>
// //               ) : (
// //                 <BuyCourseButton courseId={courseId} />
// //               )}
// //             </CardFooter>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CourseDetails;
// import React, { useState, useEffect } from "react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import ReactPlayer from "react-player";
// import { useNavigate, useParams } from "react-router-dom";
// import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
// import axios from "axios";
// import BuyCourseButton from "@/components/BuyCourseButton";

// const CourseDetails = () => {
//   const params = useParams();
//   const courseId = params.courseId;
//   const [course, setCourse] = useState(null);
//   const [creator, setCreator] = useState(null);
//   const [loading, setLoading] = useState(true); // Added loading state
//   const [purchased, setPurchased] = useState(false); // State for purchase status
//   const [purchaseCourse, setPurchase] = useState({});
//   const navigate = useNavigate();
//   const handleContinueCourse = () => {
//     if (purchased) {
//       navigate(`/course-progress/${courseId}`);
//     }
//   };

//   const handleCourse = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(
//         `https://lms-2-mdw9.onrender.com/api/v1/purchase/course/${courseId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         setPurchase(res.data.course);
//         setPurchased(res.data.purchased);
//         setLoading(false); // Set loading to false once data is fetched
//       });
//   };
//   useEffect(() => {
//     handleCourse();
//   }, []);
//   const getCourseDetails = () => {
//     const token = localStorage.getItem("token");
//     axios
//       .get(
//         // `https://lms-2-mdw9.onrender.com/api/v1/course/${courseId}`,
//         `https://lms-2-mdw9.onrender.com/api/v1/course/${courseId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((res) => {
//         setCreator(res.data.course.creator);
//         setCourse(res.data.course);
//         setLoading(false); // Set loading to false once data is fetched
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false); // Set loading to false on error as well
//       });
//   };

//   useEffect(() => {
//     getCourseDetails();
//   }, []);

//   // Show loading message if data is still being fetched
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="mt-20 space-y-5">
//       <div className="bg-[#2D2F31] text-white">
//         <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
//           <h1 className="font-bold text-2xl md:text-3xl">
//             {course.courseTitle}
//           </h1>
//           <p className="text-base md:text-lg">{course.subTitle}</p>
//           <p>
//             Created By{" "}
//             <span className="text-blue-200 underline italic">
//               {creator.name}
//             </span>
//             <div className="flex items-center gap-2 text-sm">
//               <BadgeInfo size={16} />
//               <p>last updated 8-12-2024</p>
//             </div>
//             <p>Students enrolled: {course.enrolledStudents.length || 0}</p>
//           </p>
//         </div>
//       </div>
//       <div className="flex max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="font-bold text-xl md:text-2xl">Description</h1>
//           <p
//             className="text-sm"
//             dangerouslySetInnerHTML={{ __html: course.description }}
//           />
//           <Card>
//             <CardHeader>
//               <CardTitle>Course Content</CardTitle>
//               <CardDescription>
//                 {course.lectures.length} lectures
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               {course.lectures.map((lecture, idx) => (
//                 <div key={idx} className="flex items-center gap-3 text-sm">
//                   <span>
//                     {true ? <PlayCircle size={14} /> : <Lock size={14} />}
//                   </span>
//                   <p>{lecture.lectureTitle}</p>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </div>
//         <div className="w-full lg:w-1/3">
//           <Card>
//             <CardContent className="p-4 flex flex-col">
//               <div className="w-full aspect-video mb-4">
//                 <ReactPlayer
//                   width="100%"
//                   height={"100%"}
//                   url={course.lectures[0].videoUrl}
//                   controls={true}
//                 />
//               </div>
//               <h1>{course.lectures[0]?.lectureTitle}</h1>
//               <Separator className="my-2" />
//               <h1 className="text-lg md:text-xl font-semibold">
//                 Course Price :{course.coursePrice}
//               </h1>
//             </CardContent>
//             <CardFooter className="flex justify-center p-4">
//               {purchased ? (
//                 <Button onClick={handleContinueCourse} className="w-full">
//                   Continue Course
//                 </Button>
//               ) : (
//                 <BuyCourseButton courseId={courseId} />
//               )}
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import axios from "axios";
import BuyCourseButton from "@/components/BuyCourseButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for the toast

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.courseId;
  const [course, setCourse] = useState(null);
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [purchaseCourse, setPurchase] = useState({});
  const navigate = useNavigate();

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  const handleCourse = () => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://lms-2-mdw9.onrender.com/api/v1/purchase/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setPurchase(res.data.course);
        setPurchased(res.data.purchased);
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If user is not logged in, show a toast and redirect to login page
    if (!token) {
      navigate("/login");
      toast.error("Please log in to view course details");

      return; // Return early to prevent further code execution
    }

    handleCourse();
    getCourseDetails();
  }, []);

  const getCourseDetails = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://lms-2-mdw9.onrender.com/api/v1/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCreator(res.data.course.creator);
        setCourse(res.data.course);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 space-y-5">
      <ToastContainer />
      <div className="bg-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2">
          <h1 className="font-bold text-2xl md:text-3xl">
            {course.courseTitle}
          </h1>
          <p className="text-base md:text-lg">{course.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-blue-200 underline italic">
              {creator.name}
            </span>
            <div className="flex items-center gap-2 text-sm">
              <BadgeInfo size={16} />
              <p>last updated 8-12-2024</p>
            </div>
            <p>Students enrolled: {course.enrolledStudents.length || 0}</p>
          </p>
        </div>
      </div>
      <div className="flex max-w-7xl mx-auto my-5 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="font-bold text-xl md:text-2xl">Description</h1>
          <p
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: course.description }}
          />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>
                {course.lectures.length} lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm">
                  <span>
                    {true ? <PlayCircle size={14} /> : <Lock size={14} />}
                  </span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-4">
                <ReactPlayer
                  width="100%"
                  height={"100%"}
                  url={course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h1>{course.lectures[0]?.lectureTitle}</h1>
              <Separator className="my-2" />
              <h1 className="text-lg md:text-xl font-semibold">
                Course Price :{course.coursePrice}
              </h1>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
