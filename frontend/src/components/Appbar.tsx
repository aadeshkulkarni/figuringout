import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import WriteIcon from "./icons/Write";
import SearchBox from "./SearchBox";

interface AppbarProps {
  skipAuthCheck?: boolean;
  searchQuery: any;
  setSearchQuery: any;
}

const Appbar = ({ searchQuery, setSearchQuery, skipAuthCheck = false }: AppbarProps) => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("token");
  if (!isUserLoggedIn && skipAuthCheck == false) {
    navigate("/signin");
  }
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16">
      <Link to="/blogs" className="text-xl font-bold">
        Medium
      </Link>
      {isUserLoggedIn ? (
        <div className="flex items-center gap-4 md:gap-8">
          <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>  
          <Link to="/publish">
            <button
              type="button"
              className="focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium flex items-center gap-2 rounded-lg text-sm px-3 py-2.5"
            >
              <WriteIcon /> Write
            </button>
          </Link>
          <ProfileBox />
        </div>
      ) : (
        <Link
          to="/signin"
          className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

function ProfileBox() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToBookmarks = () => {
    navigate("/bookmarks");
  };
  return (
    <div className="relative cursor-pointer">
      <Avatar name="Aadesh Kulkarni" onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-50 border border-gray-100 z-50 w-[160px]">
          <div className="flex flex-col gap-3">
            <div onClick={goToBookmarks}>Bookmarks</div>
            <div onClick={logout}>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appbar;
