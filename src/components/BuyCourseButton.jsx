// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import axios from "axios";

// const BuyCourseButton = ({ courseId }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   // const params = useParams();
//   // const courseId = params.courseId;
//   const [purchase, setPurchase] = useState({});
//   const purchaseCourseHandler = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.post(
//         "http://localhost:4000/api/v1/purchase/checkout/create-checkout-session",
//         {
//           courseId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       setPurchase(data.purchase);
//       if (data?.url) {
//         window.location.href = data.url; // Redirect to Stripe checkout
//       } else {
//         console.error("Invalid response from server.");
//       }
//     } catch (error) {
//       console.error(
//         error?.response?.data?.message || "Failed to create checkout session"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Button
//       disabled={isLoading}
//       onClick={purchaseCourseHandler}
//       on
//       className="w-full"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           Please wait
//         </>
//       ) : (
//         "Purchase Course"
//       )}
//     </Button>
//   );
// };

// export default BuyCourseButton;
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BuyCourseButton = ({ courseId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const purchaseCourseHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://lms-2-mdw9.onrender.com/api/v1/purchase/checkout/create-checkout-session",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (data?.purchase) {
        // Navigate to the next page and pass the purchase data
      }

      if (data?.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
        navigate("/purchase-success", { state: { purchase: data.purchase } });
      } else {
        console.error("Invalid response from server.");
      }
    } catch (error) {
      console.error(
        error?.response?.data?.message || "Failed to create checkout session"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      ) : (
        "Purchase Course"
      )}
    </Button>
  );
};

export default BuyCourseButton;
