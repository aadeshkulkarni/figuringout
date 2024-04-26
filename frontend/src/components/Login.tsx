import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SigninInput } from "@aadeshk/medium-common";
import InputField from "./InputField";
import { BACKEND_URL } from "../config";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "./Spinner";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [authInputs, setAuthInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      setIsLoading(true);
      if (authInputs.email && authInputs.password) {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signin`,
          authInputs
        );
        const token = response.data.jwt;
        localStorage.setItem("token", token);
        navigate("/blogs");
      }
      toast.error("Email & Password are mandatory fields.");
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response?.status &&
        error.response?.status > 300
      ) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen md:h-auto">
      <h1 className="text-4xl font-bold py-2">Sign In</h1>
      <h6>
        Don't have an account?{" "}
        <Link to="/signup" className="underline">
          Signup
        </Link>
      </h6>
      <div className="w-[400px]">
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(event) => {
            setAuthInputs({ ...authInputs, email: event.target.value });
          }}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(event) => {
            setAuthInputs({ ...authInputs, password: event.target.value });
          }}
        />
        <button
          onClick={sendRequest}
          className="w-full bg-black text-white p-4 rounded-md"
          disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign In"}
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
