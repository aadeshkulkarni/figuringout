/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "../components/ToastWrapper";

const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {}, [content]);

  async function publishArticle() {
    if (title.trim() && content.trim()) {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${response?.data?.id}`);
    }
    toast.error("Post title & content cannot be empty.");
  }
  return (
    <>
      <Appbar />
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
        <ReactQuill theme="snow" value={content} onChange={setContent}></ReactQuill>
        <button
          type="submit"
          onClick={publishArticle}
          className="w-[150px] items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>
      <ToastWrapper/>
    </>
  );
};

export default Publish;
