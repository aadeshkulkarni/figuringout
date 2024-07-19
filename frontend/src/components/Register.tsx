import type { SignupInput } from '@aadeshk/medium-common';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import InputField from './InputField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastWrapper from './ToastWrapper';
import Spinner from './Spinner';
import PasswordField from './PasswordField';
import validatePassword from '../util/passwordStrength';
import validateEmail from '../util/emailValidation';
import { GoogleLoginButton } from './GoogleLoginButton';
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [authInputs, setAuthInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setAuthInputs({ ...authInputs, password });

    const errors = validatePassword(password);
    if (errors.length > 0) {
      setPasswordError(errors.join(' '));
      setPasswordStrength('Weak');
    } else {
      setPasswordError('');
      setPasswordStrength('Strong');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendRequest();
    }
  };

  async function sendRequest() {
    try {
      setLoading(true);
      if (passwordError) {
        toast.error('Password is weak');
        return;
      }
      if (!validateEmail(authInputs.email)) {
        toast.error('Invalid Email');
        return;
      }
      if (authInputs.name && authInputs.email && authInputs.password) {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, authInputs);
        const { jwt, user } = response.data;
        localStorage.setItem('token', jwt);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/blogs');
      } else {
        toast.error('Name, Email & Password are mandatory fields.');
      }
    } catch (ex: any) {
      console.log(ex);
      toast.error(ex.response.data.error);
    } finally {
      setLoading(false);
    }
  }
  const GoogleSignupRequest = async (accessToken: string) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/google/signup`, {
        access_token: accessToken,
      });
      //console.log(response.data.user);
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
      <h1 className="text-4xl font-bold ">Create an account</h1>
      <h6>
        Already have an account?{' '}
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
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
          />
          <div className="text-sm text-gray-500 mt-1 mb-3 h-4">
            {authInputs.password ? `Password Strength: ${passwordStrength}` : ''}
          </div>
        </div>
        <button
          type="button"
          onClick={sendRequest}
          className="w-full bg-black text-white p-4 rounded-md flex justify-center items-center gap-4"
          disabled={loading}
        >
          Sign Up
          {loading && <Spinner className="w-4 h-4" />}
        </button>
        <div className="mt-8">
          <GoogleLoginButton GoogleReqHander={GoogleSignupRequest} />
        </div>
      </div>
      <ToastWrapper />
    </div>
  );
};

export default Register;
