import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="w-screen h-[500px] bg-yellow-500 flex flex-col justify-center items-center">
      <h1 className="text-7xl tracking-wide font-extrabold text-left">Stay Curious.</h1>
      <h6 className="text-4xl tracking-wide font-extralight text-left py-6">Discover stories, thinking, and expertise from writers on any topic.</h6>
      <Link to="/signup">
        <button className="py-4 px-8 rounded-full bg-gray-900 hover:bg-black text-lg tracking-wider text-white">Start reading</button>
      </Link>
    </div>
  );
};

export default Hero;
