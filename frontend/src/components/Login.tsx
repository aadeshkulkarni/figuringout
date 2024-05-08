import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import Input from "./auth/Input";
import Button from "./auth/Button";
import FieldSet from "./auth/FieldSet";
import { BACKEND_URL } from "../config";
import { SignInUserData } from "../interface";
import "react-toastify/dist/ReactToastify.css";
import { tsSignInSchema, SignInSchema } from "../lib/authSchema";
import { usePasswordVisibilityToggle } from "../hooks/usePasswordVisibilityToggle";


const Login = () => {
  const navigate: NavigateFunction = useNavigate();

  const {
    reset,
    register,
    setError,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<tsSignInSchema>({ resolver: zodResolver(SignInSchema) });

  const { passwordVisibility, togglePasswordVisibility } =
    usePasswordVisibilityToggle();

  const onSubmitForm = async (data: SignInUserData) => {

    const user = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        user
      );
      if (response.status === 200) {
        console.log("LOGIN RESPONSE", response);
        const token = response.data.jwt;
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify(response?.data?.user || {})
        );
        toast.success(response.data.message);
        reset();
        navigate("/blogs");
      }
    } catch (err: any) {  // solve the type
      setError("email", {
        type: "server",
        message: err.response?.data?.error,
      });
      setError("password", {
        type: "server",
        message: err.response?.data?.error,
      });
      console.log("LOGIN ERROR", err);
    }
  };

  return (
    <section className='flex flex-col justify-center items-center h-screen md:h-auto'>
      <h1 className='text-4xl font-bold mb-6'>Sign in</h1>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className='w-6/12 mx-auto mt-10 mb-4'>
        <FieldSet error={errors.email?.message} label='Your Email'>
          <Input
            isIcon={false}
            type={true}
            error={!!errors.email}
            register={register("email")}
            placeholder='@ Please Gives Your Email!'
          />
        </FieldSet>

        <FieldSet error={errors.password?.message} label='Your Password'>
          <Input
            isIcon={true}
            error={!!errors.password}
            type={passwordVisibility.type}
            register={register("password")}
            onToggle={togglePasswordVisibility}
            isVisible={passwordVisibility.visible}
            placeholder='Please Gives Your Password!'
          />
        </FieldSet>

        <Button type='submit' isSubmit={isSubmitting}>
          {isSubmitting ? "Loading..." : "Sign in"}
        </Button>
      </form>

      <h6 className='text-start'>
        You have already an account?
        <span className='text-blue-600 font-semibold ms-2'>
          <Link to='/signup' className='underline'>
            Sign up
          </Link>
        </span>
      </h6>

      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </section>
  );
};

export default Login;
