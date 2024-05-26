import Login from '../components/Login';
import Quote from '../components/Quote';

const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
      <Login />
      <Quote />
    </div>
  );
};

export default Signin;
