import { MouseEventHandler } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css'

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
  const quillContent = content.slice(0, 200).replaceAll('<br>','').replaceAll('<p></p>','').replaceAll('<strong>','').replaceAll('</strong>','').replaceAll("</p><p>","")+" ..."

  return (
    <Link to={`/blog/${id}`} className="blog-card p-4 border-b border-slate-200 w-full md:w-3/6 md:border md:border-gray-50 bg-white shadow-lg">
      <div className="flex items-center gap-4">
        <Avatar name={author?.name || ""} />
        <div>
          <span className="font-extralight">{author?.name}</span> · <span className="font-thin text-slate-600">{publishedDate}</span>
        </div>
      </div>
      <div className="text-xl font-bold pt-4">{title}</div>
      <div className="text-md py-4 text-slate-600">
        <ReactQuill value={quillContent} readOnly={true} theme={"bubble"} />
      </div>
      <div>{Math.ceil(content.length / 300)} min read</div>
    </Link>
  );
};

export default BlogCard;

export function Avatar({ name, onClick }: { name: string; onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div onClick={onClick} className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 hover:bg-gray-50 rounded-full">
      <span className="font-medium text-gray-600">
        {name.split(" ")?.[0]?.[0]}
        {name?.split(" ")?.[1]?.[0]}
      </span>
    </div>
  );
}
