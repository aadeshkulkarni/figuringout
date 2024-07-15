import { GoogleLogin } from '@react-oauth/google';

export const GoogleLoginButton = () => {
  return (
    <div>
      <GoogleLogin onSuccess={(res) => console.log(res)} />
    </div>
  );
};
