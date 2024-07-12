import Appbar from '@/components/Appbar';
import { Link } from 'react-router-dom';

const Custom404 = () => {
  return (
    <>
      <Appbar skipAuthCheck />

      <div className="flex flex-col justify-center items-center py-52 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-500 dark:text-gray-200 text-center">404 - Not Found</h1>
        <p className="text-gray-600 mt-4 tracking-wide text-center text-sm sm:text-base md:text-lg">The page you're looking for could not be found.</p>
        <Link className="mt-6" to={'/'}>
          <button className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 py-2 px-6 rounded-3xl text-xs sm:text-sm md:text-base">
            Go back home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
