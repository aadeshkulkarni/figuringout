import ReactQuill from "react-quill";
import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading, deleteBlog } = useBlog({ id: id || "" });
  const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const isAuthor = user?.id === blog?.author?.id;
  const deleteStory = async () => {
    if (id) {
      const message = await deleteBlog(id);
      toast.info(message);
      navigate("/blogs");
    }
  };
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-12 p-4 md:px-10">
          <div className="md:col-span-1"></div>
          <div className="order-2 md:order-1 col-span-12 md:col-span-7 md:p-4 md:border-r">
            <div className="text-xl md:text-5xl font-extrabold">{blog?.title}</div>
            <div className="text-lg font-light text-slate-500 py-4 items-center justify-center">
              Post on {blog?.publishedDate}
              {isAuthor && (
                <button
                  onClick={deleteStory}
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-12"
                >
                  Delete story
                </button>
              )}
            </div>
            <div className="py-4">
              <ReactQuill value={blog?.content} readOnly={true} theme={"bubble"} />
            </div>
          </div>
          <div className="order-1 md:order-2 col-span-12 md:col-span-2 p-4">
            Author
            <div className="flex items-center gap-4 py-4">
              <Avatar name={blog?.author?.name || "Anonymous"} />
              <div>
                <div className="font-bold">{blog?.author?.name || "Anonymous"}</div>
                <div>An artist at living. My work of art is my life.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
