import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

const Appbar = () => {
  return (
    <div className="border-b border-slate-100 flex justify-between items-center p-4 px-10">
      <Link to="/blogs" className="text-xl font-bold">
        Medium
      </Link>
      <div>
        <Link to="/publish">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mx-12"
          >
            Write
          </button>
        </Link>
        <Avatar name="Aadesh Kulkarni" />
      </div>
    </div>
  );
};

export default Appbar;
