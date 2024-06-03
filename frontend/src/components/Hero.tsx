import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-screen h-[50vh] md:h-[40vh] bg-gradient-to-r from-emerald-500 to-emerald-800 flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl md:text-5xl tracking-wide font-extrabold text-center md:text-left drop-shadow-lg">Stay Curious.</h1>
      <h6 className="text-2xl md:text-2xl tracking-wide font-light text-center md:text-left py-6 drop-shadow-lg">
      A place to read, write, and deepen your understanding.
      </h6>
      <Link
        to="/blogs"
        className="rounded-md px-3.5 py-2 my-1 overflow-hidden relative group cursor-pointer border-2 border-gray-900 font-medium bg-gray-900 text-gray-100"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 border-gray-900 group-hover:text-gray-900 group-hover:border group-hover:border-gray-900 group-hover:bg-gray-200 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-gray-100 transition font-bold duration-300 group-hover:text-gray-900 group-hover:bg-gray-200 ease text-lg tracking-wider">
          Start reading
        </span>
      </Link>
    </div>
  );
};

export default Hero;
