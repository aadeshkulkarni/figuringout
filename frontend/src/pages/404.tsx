import Appbar from '@/components/Appbar';
import { Link } from 'react-router-dom';

const Custom404 = () => {
  return (
    <>
      <Appbar skipAuthCheck />

      <div className="m-52 flex flex-col justify-center items-center ">
        <h1 className="text-4xl font-bold text-gray-500 dark:text-gray-200">404 - Not Found</h1>
        <p className="text-gray-600 mt-4 tracking-wide text-sub">The page you're looking for could not be found.</p>
        <Link className="p-4" to={'/'}>
          <button className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100  py-2 px-6 rounded-3xl flex items-center justify-center text-xs cursor-pointer ">
            Go back home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Custom404;
