import { SignupInput } from "@aadeshk/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import InputField from "./InputField";

const Register = () => {
  const navigate = useNavigate();
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/user/signup`, authInputs);
      navigate("/signin");
    } catch (ex) {
      console.log(ex);
      // Alert the user
    }
  }
  return (
    <div className="text-center flex flex-col justify-center items-center">
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
        <button onClick={sendRequest} className="w-full bg-black text-white p-4 rounded-md">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Register;
