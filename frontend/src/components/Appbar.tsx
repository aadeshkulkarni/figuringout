import { Link, useLocation, useNavigate } from 'react-router-dom';
import WriteIcon from './icons/Write';
import ProfileBox from './ProfileBox';
import Search from './Search';
import { useState, useEffect } from 'react';

interface AppbarProps {
  skipAuthCheck?: boolean;
  pageActions?: JSX.Element;
  hideWriteAction?: boolean;
}

const Appbar = ({ skipAuthCheck = false, pageActions, hideWriteAction = false }: AppbarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUserLoggedIn = localStorage.getItem('token');

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('theme');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  

  if (!isUserLoggedIn && skipAuthCheck == false) {
    navigate('/signin');
  }
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16 md:flex-wrap dark:border-gray-700">
    <div className="flex justify-center items-center gap-4">
      <Link to="/" className="text-xl font-light">
        <span className="text-gray-700 dark:text-gray-300">figuring</span>
        <span className="text-black dark:text-white">out</span>
        <span className="text-green-700">.Life</span>
      </Link>
      <Search />
    </div>

    <div className="flex items-center gap-1">
      {pathname === '/' && (
        <Link
          className="hidden sm:flex focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-3xl focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 font-medium items-center gap-2 text-sm px-5 py-2.5"
          to="/contributors"
        >
          Contributors
        </Link>
      )}

      {isUserLoggedIn ? (
        <>
          {hideWriteAction === false && (
            <Link to="/publish">
              <button
                type="button"
                className="focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700 rounded-3xl focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 font-medium flex items-center gap-2 text-sm px-5 py-2.5"
              >
                <WriteIcon /> Write
              </button>
            </Link>
          )}
          {pageActions}
          <div className="ml-4">
            <ProfileBox />
          </div>
        </>
      ) : (
        <div className="ml-4">
          <Link
            to="/signup"
            className="focus:outline-none text-white bg-gray-700 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-3xl text-sm px-5 py-2.5"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="ml-4 focus:outline-none text-gray-700 dark:text-gray-300 border border-gray-700 dark:border-gray-300 hover:bg-gray-800 hover:text-gray-50 dark:hover:bg-gray-900 dark:hover:text-white focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-3xl text-sm px-5 py-2.5"
          >
            Sign In
          </Link>
        </div>
      )}
      <button
        onClick={toggleDarkMode}
        className="ml-4 p-2 bg-gray-200 dark:bg-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  </div>
);
};

export default Appbar;
    