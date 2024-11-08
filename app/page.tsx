import CreatePost from "@/components/posts/CreatePost";
import PostList from "@/components/posts/PostList";

const Home = () => {
  return (
    <div className="flex flex-col gap-4 px-4 md:px-0 items-center min-h-screen py-20 shadow-md">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
