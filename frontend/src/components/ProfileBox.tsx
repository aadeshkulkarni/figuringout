import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useClickAway from "../hooks/useClickAway";
import Avatar from "./Avatar";

const ProfileBox = () => {
  const ref = useRef<HTMLDivElement>(null);

  const userJSON = localStorage.getItem("user") || "{}";
  const user = JSON.parse(userJSON);

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToBookmarks = () => {
    navigate("/bookmarks");
  };

  const goToProfile = () => {
    if (user && user.id) {
      navigate(`/${user.id}`);
    }
  };

  const handleClickAway = () => {
    console.log("Clicked away!");
    setShow(false);
  };

  useClickAway(ref, handleClickAway);

  return (
    <div className="relative cursor-pointer">
      <Avatar name={user.name} onClick={() => setShow(!show)} />
      {show && (
        <div
          ref={ref}
          className="absolute -bottom-32 -left-28 shadow-lg bg-gray-50 border rounded-md border-gray-100 z-50 w-[160px]"
        >
          <div className="flex flex-col">
            <div className="px-4 py-2 hover:bg-gray-300" onClick={goToProfile}>
              Profile
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-300"
              onClick={goToBookmarks}
            >
              Bookmarks
            </div>
            <div className="px-4 py-2 hover:bg-gray-300" onClick={logout}>
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBox;
