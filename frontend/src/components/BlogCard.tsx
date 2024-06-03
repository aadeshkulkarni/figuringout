import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom';
import 'react-quill/dist/quill.bubble.css';
import { getPlainTextFromHTML } from '../util/string';
import Avatar from './Avatar';
import { Pill } from './Pill';

interface BlogCardProps {
  author: {
    name: string;
    profilePic?: string;
  };
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  fullWidth?: boolean;
  tagsOnPost: Array<any>;
}

const BlogCard = ({ author, title, content, publishedDate, id, fullWidth, tagsOnPost }: BlogCardProps) => {
  // split and slice combination is added so that the string doesn't get trimmed in middle of a word
  const quillContent = getPlainTextFromHTML(content).split(' ')?.slice(0, 40).join(' ') + '...';

  return (
    <Link
      to={`/blog/${id}`}
      className={`blog-card px-4 py-8 ${fullWidth ? 'w-full' : 'md:w-3/6'} md:border-b md:border-gray-200 my-2 bg-white shadow-b-sm grid grid-cols-12 md:gap-6 lg:gap-0`}
    >
      <div className="col-span-12 md:col-span-9 md:px-4">
        <div className="flex items-center gap-4">
          <Avatar name={author?.name || ''} imageSrc={author?.profilePic} />
          <div>
            <span>{author?.name}</span> · <span className="text-sm text-slate-500">{publishedDate}</span>
          </div>
        </div>
        <div className="text-xl font-bold pt-4">{title}</div>
        <div className="tracking-wide py-4 text-slate-600">
          <ReactQuill value={quillContent} readOnly={true} theme={'bubble'} />
        </div>
      </div>
      <div className="hidden col-span-0 md:col-span-3 p-4 md:flex justify-center items-center">
        <ArticleImage uniqueId={id} />
      </div>
      <div className="flex col-span-full md:px-2">
        <div className='flex'>
					  {tagsOnPost?.slice(0,2).map((tagWrapper) => {
						  return (
							  <Pill id={tagWrapper.tag.id} tagName={tagWrapper.tag.tagName}/>
						  )
					})}
				</div>
        <div className="text-gray-600 pt-4">{Math.ceil(content.length / 300)} min read</div>

        </div>
    </Link>
  );
};

export default BlogCard;

function ArticleImage({ uniqueId }: { uniqueId: string }) {
  return (
    <object data={`https://source.unsplash.com/random/150x150?sig=${uniqueId}`} type="image/jpeg">
      <div className="bg-gray-50 w-[100%] animate-pulse aspect-square"></div>
    </object>
  );
}
