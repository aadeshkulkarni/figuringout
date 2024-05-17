import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "../components/ToastWrapper";
import Spinner from "../components/Spinner";

interface EditPublishLayoutProps {
  defaultTitle?: string;
  defaultContent?: string;
  submitFunctionName: string;
  submitFunction: (data: { title: string; content: string }) => void;
}

const EditPublishLayout: React.FC<EditPublishLayoutProps> = ({
  defaultTitle = "",
  defaultContent = "",
  submitFunctionName,
  submitFunction,
}: EditPublishLayoutProps) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await submitFunction({ title, content });
    setIsLoading(false);
  };
  return (
    <>
      <div className="flex flex-col gap-8 justify-center p-4 md:p-10">
        <div className="w-full">
          <input
            type="text"
            id="first_name"
            className="bg-gray-50 text-gray-900 text-lg focus:ring-gray-200 focus:border-gray-200 active:border-gray-200 outline-none block w-full p-4"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <TextEdtior content={content} setContent={setContent} /> */}
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
        ></ReactQuill>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-[150px] flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}        >
            {isLoading ? (
            <>
              <Spinner className="w-4 h-4"/>
              Please wait
            </>) : (
            submitFunctionName
          )}
        </button>
      </div>
      <ToastWrapper/>
    </>
  );
};

export default EditPublishLayout;
