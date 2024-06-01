import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks';
import BlogSkeleton from '../skeletons/BlogsSkeleton';

const BlogsList = () => {
  const [infiniteScrollRef, setInfiniteScrollRef] = useState<HTMLDivElement | null>(null);

  const { blogs, loading, handleLoadMore } = useBlogs();

  useEffect(() => {
    if (!infiniteScrollRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    infiniteScrollRef && observer.observe(infiniteScrollRef);
  }, [infiniteScrollRef]);
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {blogs.length > 0 &&
          blogs.map((blog) => (
            <BlogCard
              key={blog?.id}
              id={blog?.id}
              author={blog?.author}
              publishedDate={blog?.publishedDate}
              title={blog.title}
              content={blog.content}
              tagsOnPost={blog.tagsOnPost}
            />
          ))}
      </div>
      {loading && (
        <div className="flex flex-col items-center gap-4 py-8">
          {[...Array(3)].map((_, i) => (
            <BlogSkeleton key={i} />
          ))}
        </div>
      )}
      {!loading && (
        <div
          ref={(e) => {
            setInfiniteScrollRef(e);
          }}
        />
      )}
    </>
  );
};

export default BlogsList;
