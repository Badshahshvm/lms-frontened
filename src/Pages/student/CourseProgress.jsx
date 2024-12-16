// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { useParams } from "react-router-dom";
// import { CheckCircle, CirclePlay } from "lucide-react";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardTitle,
// } from "@/components/ui/card";

// const CourseProgress = () => {
//   const token = localStorage.getItem("token");
//   const { courseId } = useParams();

//   const [purchase, setPurchase] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [complete, setCompleted] = useState(false);
//   const [lectures, setLectures] = useState([]);
//   const [courseDetails, setCourseDetails] = useState({});
//   const [progress, setProgress] = useState([]);
//   const [currentVideo, setCurrentVideo] = useState(null);
//   const [activeLecture, setActiveLecture] = useState(null);

//   // Fetch purchase data
//   const getPurchase = async () => {
//     if (!token) {
//       console.error("No token found. Please log in.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `http://localhost:4000/api/v1/purchase/${courseId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("Purchase data fetched:", response.data);
//       setPurchase(response.data.purchase);
//     } catch (error) {
//       console.error(
//         "Error fetching purchase data:",
//         error.response?.data || error.message
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Verify payment
//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!purchase || !purchase.paymentId) return;

//       try {
//         const response = await axios.post(
//           "http://localhost:4000/api/v1/purchase/verify",
//           {
//             sessionId: purchase.paymentId,
//             courseId,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.success) {
//           console.log("Payment verified and purchase completed");
//         } else {
//           console.error("Payment verification failed:", response.data.message);
//         }
//       } catch (error) {
//         console.error(
//           "Error verifying payment:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     verifyPayment();
//   }, [purchase, courseId, token]);

//   // Fetch purchase data when the component mounts
//   useEffect(() => {
//     getPurchase();
//   }, [courseId, token]);

//   const getCourseProgress = () => {
//     axios
//       .get(`http://localhost:4000/api/v1/progress/${courseId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setCourseDetails(res.data.course);
//         setCompleted(res.data.completed);
//         setLectures(res.data.course.lectures);
//         setProgress(res.data.progress);
//         console.log(res.data);

//         // Automatically play the first lecture video if none is selected
//         if (!currentVideo && res.data.course.lectures.length > 0) {
//           setCurrentVideo(res.data.course.lectures[0]);
//           setActiveLecture(0);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     getCourseProgress();
//   }, [courseId]);

//   const updateLectureProgress = async (lectureId) => {
//     try {
//       const response = await axios.post(
//         `http://localhost:4000/api/v1/progress/${courseId}/lecture/${lectureId}/view`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setProgress(response.data.progress);
//       setCompleted(response.data.completed);
//       console.log(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleVideoPlay = (lectureId) => {
//     updateLectureProgress(lectureId);
//   };

//   const courseComplete=()=>
//   {
//     axios.post(`http://localhost:4000/api/v1/progress/${courseId}/complete`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//     )
//   }
//   const courseInComplete=()=>
//     {
//       axios.post(`http://localhost:4000/api/v1/progress/${courseId}/inComplete`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//       )
//     }
//   const handleComplete=async()=>
//   {
// await courseComplete()
//   }
//   const handleInComplete=async()=>
//   {    await courseInComplete

//   }
//   return (
//     <div className="max-w-7xl mx-auto p-4 mt-20">
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
//         {complete && <Button>Completed</Button>}
//       </div>
//       <div className="flex flex-col md:flex-row gap-6">
//         <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
//           <div>
//             {currentVideo ? (
//               <video
//                 controls
//                 autoPlay
//                 className="w-full rounded h-auto md:rounded-lg"
//                 src={currentVideo.videoUrl}
//                 onPlay={() => handleVideoPlay(currentVideo._id)}
//               />
//             ) : (
//               <p className="text-gray-500">Select a lecture to play the video</p>
//             )}
//           </div>
//           <div className="mt-2">
//             <h3 className="font-medium">{currentVideo?.lectureTitle}</h3>
//           </div>
//         </div>

//         {/* lectures Sidebar*/}
//         <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
//           <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
//           <div className="flex-1 overflow-y-auto">
//             {lectures.map((lecture, idx) => (
//               <Card
//                 key={idx}
//                 onClick={() => {
//                   setCurrentVideo(lecture);
//                   setActiveLecture(idx);
//                 }}
//                 className={`mb-3 hover:cursor-pointer transition transform hover:bg-gray-100 ${
//                   activeLecture === idx ? "bg-blue-100" : ""
//                 }`}
//               >
//                 <CardContent className="flex items-center justify-between p-4">
//                   <div className="flex items-center">
//                     {progress[idx]?.viewed ? (
//                       <CheckCircle size={24} className="text-green-500 mr-2" />
//                     ) : (
//                       <CirclePlay size={24} className="text-gray-500 mr-2" />
//                     )}
//                     <div>
//                       <CardTitle className="text-lg">
//                         {lecture.lectureTitle}
//                       </CardTitle>
//                     </div>
//                   </div>
//                   {progress[idx]?.viewed && (
//                     <Badge className="bg-green-200 text-green-600">completed</Badge>
//                   )}
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseProgress;
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { CheckCircle, CirclePlay } from "lucide-react";
import axios from "axios";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const CourseProgress = () => {
  const token = localStorage.getItem("token");
  const { courseId } = useParams();

  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [complete, setCompleted] = useState(false);
  const [lectures, setLectures] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [progress, setProgress] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);

  // Fetch purchase data
  const getPurchase = async () => {
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://lms-2-mdw9.onrender.com/api/v1/purchase/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Purchase data fetched:", response.data);
      setPurchase(response.data.purchase);
    } catch (error) {
      console.error(
        "Error fetching purchase data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify payment
  useEffect(() => {
    const verifyPayment = async () => {
      if (!purchase || !purchase.paymentId) return;

      try {
        const response = await axios.post(
          "https://lms-2-mdw9.onrender.com/api/v1/purchase/verify",
          {
            sessionId: purchase.paymentId,
            courseId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          console.log("Payment verified and purchase completed");
        } else {
          console.error("Payment verification failed:", response.data.message);
        }
      } catch (error) {
        console.error(
          "Error verifying payment:",
          error.response?.data || error.message
        );
      }
    };

    verifyPayment();
  }, [purchase, courseId, token]);

  // Fetch purchase data when the component mounts
  useEffect(() => {
    getPurchase();
  }, [courseId, token]);

  const getCourseProgress = () => {
    axios
      .get(`https://lms-2-mdw9.onrender.com/api/v1/progress/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourseDetails(res.data.course);
        setCompleted(res.data.completed);
        setLectures(res.data.course.lectures);
        setProgress(res.data.progress);
        console.log(res.data);

        // Automatically play the first lecture video if none is selected
        if (!currentVideo && res.data.course.lectures.length > 0) {
          setCurrentVideo(res.data.course.lectures[0]);
          setActiveLecture(0);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCourseProgress();
  }, [courseId]);

  const updateLectureProgress = async (lectureId) => {
    try {
      const response = await axios.post(
        `https://lms-2-mdw9.onrender.com/api/v1/progress/${courseId}/lecture/${lectureId}/view`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProgress(response.data.progress);
      setCompleted(response.data.completed);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleVideoPlay = (lectureId) => {
    updateLectureProgress(lectureId);
  };

  const toggleCompletion = async () => {
    try {
      if (complete) {
        await axios
          .post(
            `https://lms-2-mdw9.onrender.com/api/v1/progress/${courseId}/incomplete`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            setCompleted(false);
            console.log(res.data);
          });
      } else {
        await axios.post(
          `https://lms-2-mdw9.onrender.comapi/v1/progress/${courseId}/complete`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCompleted(true);
      }
    } catch (err) {
      console.error("Error toggling course completion:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <Button
          onClick={toggleCompletion}
          variant={complete ? "outline" : "default"}
        >
          {complete ? (
            <div className="flex items-center">
              <CheckCircle />
              <span>Mark as InComplete</span>
            </div>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            {currentVideo ? (
              <video
                controls
                autoPlay
                className="w-full rounded h-auto md:rounded-lg"
                src={currentVideo.videoUrl}
                onPlay={() => handleVideoPlay(currentVideo._id)}
              />
            ) : (
              <p className="text-gray-500">
                Select a lecture to play the video
              </p>
            )}
          </div>
          <div className="mt-2">
            <h3 className="font-medium">{currentVideo?.lectureTitle}</h3>
          </div>
        </div>

        {/* Lectures Sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture, idx) => (
              <Card
                key={idx}
                onClick={() => {
                  setCurrentVideo(lecture);
                  setActiveLecture(idx);
                }}
                className={`mb-3 hover:cursor-pointer transition transform hover:bg-gray-100 ${
                  activeLecture === idx ? "bg-blue-100" : ""
                }`}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {progress[idx]?.viewed ? (
                      <CheckCircle size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {progress[idx]?.viewed && (
                    <Badge className="bg-green-200 text-green-600">
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
