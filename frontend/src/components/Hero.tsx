import { Link } from "react-router-dom";

const Hero = () => {
  const token = localStorage.getItem("token");
  return (
    <div className="w-screen h-[500px] bg-yellow-500 flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-7xl tracking-wide font-extrabold text-center md:text-left">Stay Curious.</h1>
      <h6 className="text-2xl md:text-4xl tracking-wide font-extralight text-center md:text-left py-6">Discover stories, thinking, and expertise from writers on any topic.</h6>
      <Link to={`${token ? "/blogs" : "/signup"}`}>
        <button className="py-4 px-8 rounded-full bg-gray-800 hover:bg-black text-lg tracking-wider text-white shadow-lg shadow-yellow-600 hover:shadow-sm">Start reading</button>
      </Link>
    </div>
  );
};

export default Hero;
