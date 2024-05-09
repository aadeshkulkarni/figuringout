import { SignupInput } from "@aadeshk/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import InputField from "./InputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "./ToastWrapper";
import Spinner from "./Spinner";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      setLoading(true)
      if (authInputs.name && authInputs.email && authInputs.password) {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`,
          authInputs
        );
        const { jwt, user } = response.data;
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/blogs");
      }
      toast.error("Name, Email & Password are mandatory fields.");
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    }
    finally {
      setLoading(false)
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
      <div className="lg:w-[400px] md:w-[350px] w-screen px-2">
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
        <button
          onClick={sendRequest}
          className="w-full bg-black text-white p-4 rounded-md flex justify-center items-center gap-4"
          disabled={loading}
        >
          Sign Up
          {loading && <Spinner className="w-4 h-4"/>}
        </button>
      </div>
      <ToastWrapper />
    </div>
  );
};

export default Register;
