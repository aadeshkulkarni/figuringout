import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import ToastWrapper from '../components/ToastWrapper';
import AutogrowTextarea from '../components/AutogrowTextarea';
import { htmlTagRegex } from '../util/string';
import { videoHandler, modules } from '../util/videoHandler';
import AutosaveIndicator from '../components/AutosaveIndicator';
interface EditPublishLayoutProps {
  title?: string;
  content?: string;
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  lastSaved: number | null;
  isSaving: boolean;
  userName: string;
}

const EditPublishLayout: React.FC<EditPublishLayoutProps> = ({
  title,
  content,
  setTitle,
  setContent,
  lastSaved,
  isSaving,
  userName,
}: EditPublishLayoutProps) => {
  const writingPadRef = useRef<ReactQuill>(null);

  const handleTitleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') writingPadRef.current?.focus();
  };

  // Register the custom video handler with Quill toolbar
  Quill.register('modules/customToolbar', function (quill: any) {
    quill.getModule('toolbar').addHandler('video', videoHandler.bind(quill));
  });

  return (
    <>
      <div className="flex flex-col gap-8 justify-center p-4 md:p-10 max-w-3xl m-auto">
        <div className="w-full">
          <AutosaveIndicator lastSaved={lastSaved} isSaving={isSaving} userName={userName} />
          <AutogrowTextarea
            id="title"
            rows={1}
            className="resize-none font-noto-serif placeholder:text-gray-400 text-3xl tracking-wide placeholder:font-light text-black outline-none block w-full py-4"
            placeholder="Title"
            required
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={handleTitleKeyUp}
          ></AutogrowTextarea>
        </div>
        {/* <TextEdtior content={content} setContent={setContent} /> */}
        <ReactQuill
          ref={writingPadRef}
          theme="bubble"
          value={content}
          onChange={(value) => setContent(htmlTagRegex.test(value) ? '' : value)}
          placeholder="Tell your story..."
          className="tracking-wide text-[#0B1215] font-light"
          modules={modules}
        ></ReactQuill>
      </div>
      <ToastWrapper />
    </>
  );
};

export default EditPublishLayout;
