import { Link } from 'react-router-dom';

interface PillProps {
  id: string;
  tagName: string;
}
export function Pill({ id, tagName }: PillProps) {
  return (
    <Link to={`/blogs?tag=${id}`}>
      <div className="p-2" key={id}>
        <div className="bg-gray-50 border border-gray-300 text-gray-500 hover:text-gray-600 py-2 px-4 rounded-3xl flex items-center justify-center text-xs cursor-pointer">
          {tagName}
        </div>
      </div>
    </Link>
  );
}
