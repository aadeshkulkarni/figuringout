import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastWrapper from "../components/ToastWrapper";
import Spinner from "../components/Spinner";
import AutogrowTextarea from "../components/AutogrowTextarea";

const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const writingPadRef = useRef<ReactQuill>(null);

  useEffect(() => {}, [content]);

  async function publishArticle() {
    if (title.trim() && content.trim()) {
      try {
        setLoading(true);
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
      } catch (error) {
        toast.error("Failed to publish the article. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Post title & content cannot be empty.");
    }
  }

  const handleTitleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") writingPadRef.current?.focus();
  };

  return (
    <>
      <Appbar
        hideWriteAction
        pageActions={
          <div className="ml-2">
            <button
              type="submit"
              onClick={publishArticle}
              className="primary"
              disabled={!loading}
            >
              <div className="flex items-center gap-2">
                {loading && <Spinner className="h-4 w-4 !border-2" />}
                Publish
              </div>
            </button>
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
          onChange={setContent}
        ></ReactQuill>
      </div>
      <ToastWrapper />
    </>
  );
};

export default Publish;
