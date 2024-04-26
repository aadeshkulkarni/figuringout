import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-12 p-4 px-10">
          <div className="col-span-8 p-4 border-r">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div className="text-lg font-light text-slate-500 py-4">Post on 3rd December, 2024</div>
            <div className="py-4">{blog?.content}</div>
          </div>
          <div className="col-span-4 p-4">
            Author
            <div className="flex items-center gap-4 py-4">
              <Avatar name={blog?.author?.name || "Anonymous"} />
              <div>
                <div className="font-bold">{blog?.author?.name || "Anonymous"}</div>
                <div>Random catch phrase to grab attention</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
