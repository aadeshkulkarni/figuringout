import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { SigninInput } from '@aadeshk/medium-common';
import InputField from './InputField';
import { BACKEND_URL } from '../config';
import { toast } from 'react-toastify';
import ToastWrapper from './ToastWrapper';
import Spinner from './Spinner';
import PasswordField from './PasswordField';
import { GoogleLoginButton } from './GoogleLoginButton';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [authInputs, setAuthInputs] = useState<SigninInput>({
    email: '',
    password: '',
  });
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendRequest();
    }
  };

  async function sendRequest() {
    try {
      setLoading(true);
      if (authInputs.email && authInputs.password) {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, authInputs);
        const token = response.data.jwt;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response?.data?.user || {}));
        navigate('/blogs');
      } else {
        toast.error('Email & Password are mandatory fields.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status && error.response.status > 300) {
          toast.error(error.response.data.message || 'Email or Password Mismatch');
        } else {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }
  const GoogleSignInRequest = async (accessToken: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/google/signin`, {
        access_token: accessToken,
      });
      //console.log(response.data);
      localStorage.setItem('token', response?.data?.jwt);
      localStorage.setItem('user', JSON.stringify(response?.data?.user || {}));
      navigate('/blogs');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status && error.response.status > 300) {
          toast.error(error.response.data.message || 'Please Try Again');
        } else {
          toast.error('Something went wrong');
        }
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center flex flex-col justify-center items-center h-screen md:h-auto">
      <h1 className="text-4xl font-bold py-2">Sign In</h1>
      <h6>
        Don't have an account?{' '}
        <Link to="/signup" className="underline">
          Signup
        </Link>
      </h6>
      <div className="lg:w-[400px] md:w-[350px] w-screen px-2 ">
        <InputField
          label="Email"
          placeholder="Enter your email"
          type="email"
          onChange={(event) => {
            setAuthInputs({ ...authInputs, email: event.target.value });
          }}
        />
        <PasswordField
          label="Password"
          placeholder="Enter your password"
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            setAuthInputs({ ...authInputs, password: event.target.value });
          }}
        />
        <button
          onClick={sendRequest}
          type="button"
          className="w-full bg-black text-white p-4 rounded-md flex justify-center items-center gap-4"
          disabled={loading}
        >
          Sign In
          {loading && <Spinner className="w-4 h-4" />}
        </button>
        <div className="mt-8">
          <GoogleLoginButton GoogleReqHander={GoogleSignInRequest} />
        </div>
      </div>
      <ToastWrapper />
    </div>
  );
};

export default Login;
