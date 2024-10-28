import CreatePost from "@/components/posts/CreatePost";
import PostList from "@/components/posts/PostList";

const Home = () => {
  return (
    <div className="flex flex-col items-center min-h-screen pt-20 pb-20 md:p-20 shadow-md">
      <CreatePost />
      <PostList />
    </div>
  );
};

export default Home;
