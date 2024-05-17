import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../skeletons/BlogsSkeleton";

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
      <Appbar skipAuthCheck />
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8">
        {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
      </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
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
