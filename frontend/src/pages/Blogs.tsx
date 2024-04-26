import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import Spinner from "../components/Spinner";

export interface BlogType {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

const Blogs = () => {
  const { blogs, loading } = useBlogs();
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {blogs.length > 0 && blogs.map((blog: BlogType) => <BlogCard id={blog?.id} author={blog?.author} publishedDate="Dec 3, 2024" title={blog.title} content={blog.content} />)}
        </div>
      )}
    </>
  );
};

export default Blogs;
