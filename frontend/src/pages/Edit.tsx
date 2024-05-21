import Appbar from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBlog } from "../hooks";
import Spinner from "../components/Spinner";
import EditPublishLayout from "../layouts/EditPublishLayout";
import { useState, useEffect } from "react";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { blog, loading, editBlog } = useBlog({ id: id || "" });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [loading, blog]);

  async function finishEdit() {
    if (title.trim() && content.trim()) {
      setIsSaving(true);
      const response = await editBlog({ id: blog.id, title, content });
      if (response) {
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.info(response);
          navigate(`/blog/${response?.id}`);
        }
        setIsSaving(false);
      }
    } else {
      toast.error("Post title & content cannot be empty.");
    }
  }
  return (
    <>
      <Appbar
        hideWriteAction
        pageActions={
          <div>
            <button
              type="submit"
              onClick={finishEdit}
              className="primary"
              disabled={isSaving}
            >
              <div className="flex items-center gap-2">
                {isSaving && <Spinner className="h-4 w-4 !border-2" />}
                Finish Edit
              </div>
            </button>
          </div>
        }
      />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <EditPublishLayout
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
        />
      )}
    </>
  );
};

export default Edit;
