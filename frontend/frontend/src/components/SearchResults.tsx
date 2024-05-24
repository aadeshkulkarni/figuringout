import React from "react";
import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks";
import Appbar from "../components/Appbar";
import BlogSkeleton from "../skeletons/BlogsSkeleton";


const SearchResults = () => {
  const { blogs, loading } = useBlogs();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <Appbar searchQuery={query} setSearchQuery={() => {}} />
      {loading ? (
        <div className="flex flex-col items-center gap-4 py-8">
          {[...Array(3)].map((_, i) => <BlogSkeleton key={i} />)}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
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
            <p>No results found for "{query}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
