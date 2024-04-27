import ReactQuill from "react-quill";
import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css'

const Blog = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });
  console.log(blog)
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-12 p-4 md:px-10">
          <div className="order-2 md:order-1 col-span-12 md:col-span-9 md:p-4 md:border-r">
            <div className="text-xl md:text-5xl font-extrabold">{blog?.title}</div>
            <div className="text-lg font-light text-slate-500 py-4">Post on {blog?.publishedDate}</div>
            <div className="py-4">
              <ReactQuill value={blog?.content} readOnly={true} theme={"bubble"} />
            </div>
          </div>
          <div className="order-1 md:order-2 col-span-12 md:col-span-3 p-4">
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
