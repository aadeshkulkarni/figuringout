import { useEffect, useState } from 'react';
import MultiSelectDropdown, { Option } from './MultiSelect';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const PublishTags = ({
  blogId,
  title,
  content,
  onClick,
}: {
  blogId: string;
  title: string;
  content: string;
  onClick: () => Promise<void>;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [visible, setVisibility] = useState(false);
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchTags() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/tag`);
      const transformedTags = response.data.tags.map((tag: { id: string; tagName: string }) => {
        return { text: tag.tagName, value: tag.id };
      });
      setTagOptions(transformedTags);
      console.log(transformedTags);
    }
    fetchTags();
  }, []);

  async function linkTopics() {
    try {
      if (selectedOptions.length === 0) {
        return;
      }
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
      }
      const tagIds = selectedOptions.map((option: Option) => option.value);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/tag/link`,
        {
          postId: blogId,
          tags: tagIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response: ', response);
      navigate(`/blog/${blogId}`);
    } catch (e) {
      return { error: 'An error has occured trying to edit the blog' };
    }
  }

  return (
    <>
      <Button
        type="button"
        disabled={loading || title.trim().length === 0 || content.trim().length === 0}
        rounded="full"
        variant="premium"
        onClick={async () => {
          setLoading(true);
          await onClick();
          setVisibility(true);
          setLoading(false);
        }}
      >
        Publish
      </Button>

      {visible && (
        <div
          aria-hidden="true"
          className={`${
            visible ? 'block' : 'hidden'
          } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="relative w-full h-[100vh] max-h-full">
            <div className="relative h-full bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={() => setVisibility(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4 flex flex-col justify-center items-center">
                <div className="md:w-[500px]">
                  <div className="py-4 text-lg">
                    Publishing to: <span className="font-bold">Aadesh Kulkarni</span>
                  </div>
                  <p>Add or change topics (up to 5) so readers know what your story is about</p>
                  <MultiSelectDropdown
                    options={tagOptions}
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                  />
                  <div className="flex gap-4 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="button" className="primary" onClick={linkTopics}>
                      Publish
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => {
                        setVisibility(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PublishTags;
