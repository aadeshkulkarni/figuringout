import { Link, useLocation, useNavigate } from 'react-router-dom';
import WriteIcon from './icons/Write';
import ProfileBox from './ProfileBox';

interface AppbarProps {
  skipAuthCheck?: boolean;
  pageActions?: JSX.Element;
  hideWriteAction?: boolean;
}

const Appbar = ({ skipAuthCheck = false, pageActions, hideWriteAction = false }: AppbarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isUserLoggedIn = localStorage.getItem('token');

  if (!isUserLoggedIn && skipAuthCheck == false) {
    navigate('/signin');
  }
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16">
      <Link to="/blogs" className="text-xl font-bold">
        Medium
      </Link>

      <div className="flex items-center gap-1">
        {pathname === '/' && (
          <Link
            className="hidden sm:flex focus:outline-none hover:bg-gray-100 rounded-3xl focus:ring-4 focus:ring-gray-100 font-medium items-center gap-2 text-sm px-5 py-2.5"
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
                  className="focus:outline-none hover:bg-gray-100 rounded-3xl focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 text-sm px-5 py-2.5"
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
              to="/signin"
              className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-3xl text-sm px-5 py-2.5"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appbar;
