import Quote from '../components/Quote';
import Register from '../components/Register';

const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-screen h-screen">
      <Register />
      <Quote />
    </div>
  );
};

export default Signup;
