import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import { useBlogs } from "../hooks";
import Spinner from "../components/Spinner";

export interface BlogType {
  id: string;
  title: string;
  content: string;
  publishedDate: string;
  author: {
    id: string;
    name: string;
  };
  claps: [];
  bookmarkId?: string;
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
        <div className="flex flex-col justify-center items-center bg-gray-50">
          {blogs.length > 0 &&
            blogs.map((blog: BlogType) => (
              <BlogCard
                id={blog?.id}
                author={blog?.author}
                publishedDate={blog?.publishedDate}
                title={blog.title}
                content={blog.content}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default Blogs;
