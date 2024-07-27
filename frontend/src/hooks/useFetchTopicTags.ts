import { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Tag {
  id: string;
  tagName: string;
  postCount: number; // Add postCount to the Tag interface
}

interface TagOption {
  text: string;
  value: string;
}

interface UseFetchTopicTagsResult {
  tagOptions: TagOption[];
  loading: boolean;
}

const useFetchTopicTags = (): UseFetchTopicTagsResult => {
  const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/tag`);
        const filteredTags = response.data.tags.filter((tag: Tag) => tag.postCount > 0);
        const transformedTags = filteredTags.map((tag: Tag) => ({
          text: tag.tagName,
          value: tag.id,
        }));
        setTagOptions(transformedTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  return { tagOptions, loading };
};

export default useFetchTopicTags;
