import { useContext } from 'react';
import BlogSkeleton from '../../skeletons/BlogsSkeleton';
import BlogCard from '../BlogCard';
import { UserProfileContext } from './UserProfile';

const UserHomeTab = () => {
  const { blogs, loadingUserBlogs } = useContext(UserProfileContext);

  return (
    <div>
      {loadingUserBlogs ? (
        <BlogSkeleton />
      ) : (
        <div className="flex flex-col">
          {blogs &&
            blogs.length > 0 &&
            blogs.map((blog) => (
              <BlogCard
                key={blog?.id}
                id={blog?.id}
                author={blog?.author}
                publishedDate={blog?.publishedDate}
                title={blog.title}
                content={blog.content}
                tagsOnPost={blog.tagsOnPost}
                fullWidth
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default UserHomeTab;
