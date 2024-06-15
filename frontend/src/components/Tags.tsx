import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { Pill } from './Pill';

export function Tags() {
  const { id } = useParams();
  const { blog } = useBlog({
    id: id || '',
  });

  return (
    <div className="flex flex-wrap justify-center">
      {blog.tagsOnPost.map((tagWrapper) => {
        return <Pill key={tagWrapper.tag.id} id={tagWrapper.tag.id} tagName={tagWrapper.tag.tagName} />;
      })}
    </div>
  );
}
