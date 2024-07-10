import { Link } from 'react-router-dom';

interface PillProps {
  id: string;
  tagName: string;
}
export function Pill({ id, tagName }: PillProps) {
  return (
    <Link to={`/blogs?tag=${id}`}>
      <div className="p-2" key={id}>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100  py-2 px-4 rounded-3xl flex items-center justify-center text-xs cursor-pointer">
          {tagName}
        </div>
      </div>
    </Link>
  );
}
