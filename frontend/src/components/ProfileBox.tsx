import { useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const ProfileBox = () => {
  const userJSON = localStorage.getItem("user") || "{}";
  const user = JSON.parse(userJSON);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToBookmarks = () => {
    navigate("/bookmarks");
  };

  const goToProfile = () => {
    if (user?.id) {
      navigate(`/${user.id}`);
    }
  };
  return (
    <div className="relative cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar name={user.name} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-10}>
          <DropdownMenuItem onClick={goToProfile}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={goToBookmarks}>Bookmarks</DropdownMenuItem>
          <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileBox;
