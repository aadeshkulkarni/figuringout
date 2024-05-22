import { useEffect, useState } from "react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  // Search-Logic
  useEffect(() => {
    if (searchQuery) {
      const debouncedSearch = setTimeout(() => {
        setSearchedData(
          blogs.filter((info: any) => {
            return Object.values(info.title)
              .join('')
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          })
        )

        return () => clearTimeout(debouncedSearch);
      }, 2000);
    }
    else {
      setSearchedData(blogs);
    }
  }, [searchQuery])


  return (
    <>
      <Appbar skipAuthCheck searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8">
          {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {searchQuery.length > 0 ? (
            searchedData.map((blog: BlogType) => (
              <BlogCard
                id={blog?.id}
                author={blog?.author}
                publishedDate={blog?.publishedDate}
                title={blog.title}
                content={blog.content}
              />
            ))
          ) : (
              blogs.length > 0 &&
                blogs.map((blog: BlogType) => (
                  <BlogCard
                    id={blog?.id}
                    author={blog?.author}
                    publishedDate={blog?.publishedDate}
                    title={blog.title}
                    content={blog.content}
                  />
                ))
          )}
        </div>
      )}
    </>
  );
};
export default Blogs;