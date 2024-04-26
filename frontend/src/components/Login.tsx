import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SigninInput } from "@aadeshk/medium-common";
import InputField from "./InputField";
import { BACKEND_URL } from "../config";

const Login = () => {
  const navigate = useNavigate();
  const [authInputs, setAuthInputs] = useState<SigninInput>({
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, authInputs);
      const token = response.data.jwt;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (ex) {
      console.log(ex);
      // Alert the user
    }
  }
  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold ">Sign In</h1>
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
        <button onClick={sendRequest} className="w-full bg-black text-white p-4 rounded-md">
         Sign In
        </button>
      </div>
    </div>
  );
};

export default Login;
