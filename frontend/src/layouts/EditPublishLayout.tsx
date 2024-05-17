import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "../components/ToastWrapper";

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
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
        ></ReactQuill>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-[150px] flex justify-center items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Please wait
            </>
          ) : (
            submitFunctionName
          )}
        </button>
      </div>
      <ToastWrapper />
    </>
  );
};

export default EditPublishLayout;
