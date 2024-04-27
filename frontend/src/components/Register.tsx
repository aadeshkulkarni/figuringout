import { SignupInput } from "@aadeshk/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import InputField from "./InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      setIsLoading(true);

      if (authInputs.name && authInputs.email && authInputs.password) {
        await axios.post(`${BACKEND_URL}/api/v1/user/signup`, authInputs);
        navigate("/signin");
      }
      toast.error("Name, Email & Password are mandatory fields.");
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="text-center flex flex-col justify-center items-center h-screen md:h-auto">
      <h1 className="text-4xl font-bold ">Create an account</h1>
      <h6>
        Already have an account?{" "}
        <Link to="/signin" className="underline">
          Login
        </Link>
      </h6>
      <div className="w-[400px]">
        <InputField
          label="Name"
          placeholder="Enter your name"
          onChange={(event) => {
            setAuthInputs({ ...authInputs, name: event.target.value });
          }}
        />
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
        {/*  */}
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
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </div>
  );
};

export default Register;
