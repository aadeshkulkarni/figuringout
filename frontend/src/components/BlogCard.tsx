import { Link } from "react-router-dom";

interface BlogCardProps {
  author: {
    name: string;
  };
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

const BlogCard = ({ author, title, content, publishedDate, id }: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="p-4 border-b border-slate-200 md:w-2/5">
      <div className="flex items-center gap-4">
        <Avatar name={author?.name || ""} />
        <div>
          <span className="font-extralight">{author?.name}</span> · <span className="font-thin text-slate-600">{publishedDate}</span>
        </div>
      </div>
      <div className="text-xl font-bold pt-4">{title}</div>
      <div className="text-md py-4 text-slate-600">{content.slice(0, 300)} ...</div>
      <div>{Math.ceil(content.length / 100)} min read</div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {name.split(" ")?.[0]?.[0]}
        {name?.split(" ")?.[1]?.[0]}
      </span>
    </div>
  );
}
