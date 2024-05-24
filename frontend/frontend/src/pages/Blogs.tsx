import React from "react";
import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import BlogSkeleton from "../skeletons/BlogsSkeleton";

const Blogs = () => {
  const { blogs, loading, searchQuery, setSearchQuery } = useBlogs();

  return (
    <>
      <Appbar skipAuthCheck searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8">
          {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                author={blog.author}
                publishedDate={blog.publishedDate}
                title={blog.title}
                content={blog.content}
              />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Blogs;
// Path: frontend/frontend/src/pages/Bookmarks.tsx