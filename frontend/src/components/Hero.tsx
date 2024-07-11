import { Link } from 'react-router-dom';
import TypewriterComponent from 'typewriter-effect';

const Hero = () => {
  return (
    <div className="w-screen h-[100vh] md:h-[40vh] bg-gradient-to-r from-slate-800 via-zinc-700 to-gray-800 dark:from-slate-900 dark:via-zinc-800 dark:to-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl md:pt-8 md:text-4xl tracking-wide font-extrabold text-center md:text-left drop-shadow-2xl">
        <TypewriterComponent
          options={{
            strings: ['Stay Curious.', 'Stay hungry.', 'Stay fresh.', 'Introspect.'],
            autoStart: true,
            loop: true,
          }}
        />
      </h1>
      <h6 className="px-8 text-xl md:text-2xl tracking-wide font-light text-center md:text-left py-6 drop-shadow-lg">
        A place to read, write, and deepen your understanding.
      </h6>
      <Link
        to="/blogs"
        className="rounded-md px-3.5 py-2 my-1 overflow-hidden relative group cursor-pointer border-2 border-gray-900 font-medium bg-gray-900 text-gray-100"
      >
        <span className="absolute w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 border-gray-900 dark:border-gray-200 group-hover:text-gray-900 group-hover:border group-hover:border-gray-900 group-hover:bg-gray-200 top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
        <span className="relative text-gray-100 transition font-bold duration-300 group-hover:text-gray-900 group-hover:bg-gray-200 ease text-md md:text-lg tracking-wider">
          Start reading
        </span>
      </Link>
      <div className="container-chevron pt-16 md:hidden">
        <div className="chevron"></div>
        <div className="chevron"></div>
        <div className="chevron"></div>
        <span className="text">Scroll down</span>
      </div>
    </div>
  );
};

export default Hero;
