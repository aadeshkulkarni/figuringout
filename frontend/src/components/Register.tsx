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
  const [loading, setLoading] = useState<boolean>(false);
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");


  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }
    return errors;
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setAuthInputs({ ...authInputs, password });

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordError(errors.join(" "));
      setPasswordStrength("Weak");
    } else {
      setPasswordError("");
      setPasswordStrength("Strong");
    }
  };

  async function sendRequest() {
    try {
      setLoading(true);
      if (authInputs.name && authInputs.email && authInputs.password && !passwordError) {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signup`,
          authInputs
        );
        const { jwt, user } = response.data;
        localStorage.setItem("token", jwt);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/blogs");
      } else {
        toast.error("Name, Email & Password are mandatory fields, and password must meet the criteria.");
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="text-center flex flex-col justify-center items-center h-screen md:h-auto">
      <h1 className="text-4xl font-bold">Create an account</h1>
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
        <div className="relative">
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={handlePasswordChange}
          />
          <div className="text-sm text-gray-500 mt-1 mb-3">
            Password Strength: {passwordStrength}
          </div>

        </div>
        <button
          onClick={sendRequest}
          className="w-full bg-black text-white p-4 rounded-md flex justify-center items-center gap-4"
          disabled={loading}
        >
          Sign Up
          {loading && <Spinner className="w-4 h-4" />}
        </button>
      </div>
      <ToastWrapper />
    </div>
  );
};

export default Register;
