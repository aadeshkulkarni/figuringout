import axios from 'axios';
import Appbar from '../components/Appbar';
import { BACKEND_URL, FF_ENABLE_AI } from '../config';
import { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastWrapper from '../components/ToastWrapper';
import AutogrowTextarea from '../components/AutogrowTextarea';
import { useAI } from '../hooks/blog';
import GenerateAIBtn from '../components/GenerateAIBtn';
import PublishTags from '../components/PublishTags';
import { htmlTagRegex } from '../util/string';
import useAutoSaveDraft from '../hooks/useAutoSaveDraft';
import { videoHandler, modules } from '../util/videoHandler';

// Register the custom video handler with Quill toolbar
Quill.register('modules/customToolbar', function (quill: any) {
  quill.getModule('toolbar').addHandler('video', videoHandler.bind(quill));
});

const Publish = () => {
  const { draft, deleteDraft } = useAutoSaveDraft('new_article', () => ({ title, content }));

  const { generateBlog } = useAI();
  const [title, setTitle] = useState(draft?.title || '');
  const [content, setContent] = useState(draft?.content || '');
  const [blogId, setBlogId] = useState('');

  const writingPadRef = useRef<ReactQuill>(null);

  async function publishArticle() {
    if (title.trim() && content.trim()) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        // Clear drafts when saved on server
        deleteDraft();
        setBlogId(response?.data?.id);
      } catch (error) {
        toast.error('Failed to publish the article. Please try again.');
      }
    } else {
      toast.error('Post title & content cannot be empty.');
    }
  }

  async function generateArticle() {
    const generation = await generateBlog(title);
    setContent(generation.article);
  }

  const handleTitleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') writingPadRef.current?.focus();
  };

  return (
    <>
      <Appbar
        hideWriteAction
        pageActions={
          <div className="ml-2 flex gap-4">
            {FF_ENABLE_AI && title.trim().length > 10 && <GenerateAIBtn onClickHandler={generateArticle} />}
            <PublishTags onClick={publishArticle} blogId={blogId} title={title} content={content} />
          </div>
        }
      />
      <div className="flex flex-col gap-4 justify-center p-4 md:p-10 max-w-3xl m-auto">
        <div className="w-full">
          <AutogrowTextarea
            id="title"
            rows={1}
            className="resize-none font-noto-serif placeholder:text-gray-400 text-3xl tracking-wide placeholder:font-light text-black outline-none block w-full py-4"
            placeholder="Title"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle((e.target as HTMLTextAreaElement).value)}
            onKeyUp={handleTitleKeyUp}
          ></AutogrowTextarea>
        </div>
        <ReactQuill
          ref={writingPadRef}
          theme="bubble"
          placeholder="Tell your story..."
          className="tracking-wide text-[#0B1215] font-light"
          value={content}
          onChange={(value) => setContent(htmlTagRegex.test(value) ? '' : value)}
          modules={modules}
        ></ReactQuill>
      </div>
      <ToastWrapper />
    </>
  );
};

export default Publish;
