import { MouseEventHandler } from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.bubble.css'
import { getPlainTextFromHTML } from "../util/string";

interface BlogCardProps {
  author: {
    name: string;
  };
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  fullWidth?: boolean;
}

const BlogCard = ({ author, title, content, publishedDate, id, fullWidth }: BlogCardProps) => {
  // split and slice combination is added so that the string doesn't get trimmed in middle of a word
  const quillContent = getPlainTextFromHTML(content).split(" ").slice(0, 40).join(" ") + "...";
  
  return (
    <Link to={`/blog/${id}`} className={`blog-card px-4 py-8 border-b border-slate-200 w-full ${!fullWidth ? "md:w-3/6" : null} md:border md:border-gray-50 bg-white shadow-sm`}>
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

type AvatarProps = {
  name: string;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLDivElement>
}
export function Avatar({ name, onClick, size = "medium" }: AvatarProps) {

  const getDimensions = () => { 
    switch (size) {
      case "small":
        return {
          containerSize: "w-5 h-5",
        }
      case "medium":
        return {
          containerSize: "w-10 h-10",
        }
      case "large":
        return {
          containerSize: "w-20 h-20",
          textSize: "text-xl"
        }
    }
  }

  const { containerSize, textSize } = getDimensions();
  return (
    <div onClick={onClick} className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200 hover:bg-gray-50 rounded-full ${containerSize}`}>
      <span className={`font-medium ${textSize} text-gray-600`}>
        {name.split(" ")?.[0]?.[0]}
        {name?.split(" ")?.[1]?.[0]}
      </span>
    </div>
  );
}
