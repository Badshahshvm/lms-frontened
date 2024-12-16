import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    image: null, // New field for image
    imagePreview: null, // New field for image preview
  });

  const changeInputHandler = (e, type) => {
    const { name, value, files } = e.target;

    if (type === "signup") {
      if (name === "image") {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setSignup({ ...signup, image: file, imagePreview: reader.result });
          };
          reader.readAsDataURL(file); // Convert file to a base64 URL
        }
      } else {
        setSignup({ ...signup, [name]: value });
      }
    } else {
      setLogin({ ...login, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    try {
      if (type === "signup") {
        const formData = new FormData();
        formData.append("name", signup.name);
        formData.append("email", signup.email);
        formData.append("password", signup.password);
        if (signup.image) {
          formData.append("image", signup.image);
        }

        const response = await axios.post(
          "https://lms-2-mdw9.onrender.com/api/v1/auth/new",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Signup successful! Please login.");
        setSignup({
          name: "",
          email: "",
          password: "",
          image: null,
          imagePreview: null,
        });
      } else {
        const response = await axios.post(
          "https://lms-2-mdw9.onrender.com/api/v1/auth",
          login
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("photoUrl", response.data.user.photoUrl);
        localStorage.setItem("name", response.data.user.name);
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("id", response.data.user._id);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(
        `${type === "signup" ? "Signup" : "Login"} failed: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="w-full flex items-center justify-center mt-20">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Tabs defaultValue="login" className="w-[400px]">
        {/* Tabs for Login and Signup */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>

        {/* Login Tab Content */}
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Access your account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => changeInputHandler(e, "login")}
                  value={login.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => changeInputHandler(e, "login")}
                  value={login.password}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Signup Tab Content */}
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Create a new account here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="signup-name">Name</Label>
                <Input
                  id="signup-name"
                  name="name"
                  placeholder="Enter your name"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  value={signup.name}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  value={signup.email}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  onChange={(e) => changeInputHandler(e, "signup")}
                  value={signup.password}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="signup-image">Profile Picture</Label>
                <Input
                  id="signup-image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              {signup.imagePreview && (
                <div className="mt-4">
                  <Label>Preview:</Label>
                  <img
                    src={signup.imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full border border-gray-200"
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
