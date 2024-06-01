import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="w-screen h-[40vh] bg-gradient-to-r from-amber-200 to-yellow-500 flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-5xl tracking-wide font-extrabold text-center md:text-left">Stay Curious.</h1>
      <h6 className="text-2xl md:text-2xl tracking-wide font-light text-center md:text-left py-6">
      A place to read, write, and deepen your understanding.
      </h6>
      <Link
        to="/blogs"
        className="rounded-md px-3.5 py-2 my-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-gray-900 text-gray-800"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-gray-900 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-gray-900 transition font-bold duration-300 group-hover:text-white ease text-lg tracking-wider">
          Start reading
        </span>
      </Link>
    </div>
  );
};

export default Hero;
