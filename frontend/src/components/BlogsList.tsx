import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks';
import BlogSkeleton from '../skeletons/BlogsSkeleton';
import AnimatedMessage from './Blog/AnimatedMessage';
import ScrollToTopButton from './ScrollToTop';
import SubscriberCard from './SubscriberCard';
import { useRecommendedSubscribers } from '../hooks/useRecommendedSubscribers';
import { User } from '@/types/user';
import RecommendedSubscriberSkeleton from '../skeletons/RecommendedSubscriberSkeleton';

const BlogsList = () => {
  const [infiniteScrollRef, setInfiniteScrollRef] = useState<HTMLDivElement | null>(null);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { blogs, loading, handleLoadMore } = useBlogs();
  const { recommendedSubscribers, recommendedSubscriberLoading } = useRecommendedSubscribers();

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

  useEffect(() => {
    if (!loading && blogs.length > 0) {
      const timer = setTimeout(() => {
        setShowEndMessage(true);
        setShowConfetti(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [blogs, loading]);
  return (
    <>
      <div className="grid grid-cols-12 mx-auto max-w-5xl gap-4">
        <div className="col-span-12 md:col-span-8 w-full">
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
        <div className="col-span-12 md:col-span-4 md:py-4 md:border-l">
          {recommendedSubscribers.length > 0 &&
            recommendedSubscribers.map((subscriber: User) => (
              <SubscriberCard
                key={subscriber?.id}
                id={subscriber?.id}
                name={subscriber?.name}
                profilePic={subscriber?.profilePic}
              />
            ))}
        </div>
      </div>
      {loading && recommendedSubscriberLoading && (
        <div className="grid grid-cols-12 mx-auto max-w-5xl gap-8">
          <div className="col-span-12 md:col-span-8 w-full">
            {[...Array(3)].map((_, i) => (
              <BlogSkeleton key={i} />
            ))}
          </div>
          <div className="col-span-12 md:col-span-4 w-full">
            {[...Array(3)].map((_, i) => (
              <RecommendedSubscriberSkeleton key={i} />
            ))}
          </div>
        </div>
      )}
      {!loading && (
        <div
          ref={(e) => {
            setInfiniteScrollRef(e);
          }}
        />
      )}
      {!loading && showEndMessage && (
        <AnimatedMessage showConfetti={showConfetti} onConfettiComplete={() => setShowConfetti(false)} />
      )}
      <ScrollToTopButton />
    </>
  );
};

export default BlogsList;
