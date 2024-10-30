import Post, { NoPosts } from "./Post";
import { fetchPosts } from "@/app/actions/posts";

const PostList = async () => {
  const PostList: PostProps[] = await fetchPosts();
  if (PostList.length === 0) <NoPosts />;

  return PostList.map(({ _id, ...data }: PostProps) => <Post key={_id} {...data} _id={_id} />);
};

export default PostList;
