import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("token");
  if (!isUserLoggedIn) {
    navigate("/signin");
  }
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 md:px-16">
      <Link to="/blogs" className="text-xl font-bold">
        Medium
      </Link>
      {isUserLoggedIn && (
        <div className="flex gap-4 md:gap-8">
          <Link to="/publish">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mx-12"
            >
              Write
            </button>
          </Link>
          <ProfileBox />
        </div>
      )}
    </div>
  );
};

function ProfileBox() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const GoToBookmarks = () => {
    navigate("/userBookmarks");
  };
  return (
    <div className="relative cursor-pointer">
      <Avatar name="Aadesh Kulkarni" onClick={() => setShow(!show)} />
      {show && (
        <div className="absolute -bottom-24 -left-16 shadow-lg p-4 bg-gray-50 border border-gray-100 z-50 w-[160px]">
          <div className="flex flex-col gap-3">
            <div onClick={GoToBookmarks}>Bookmarks</div>
            <div onClick={Logout}>Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appbar;
