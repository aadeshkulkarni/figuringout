import Appbar from "../components/Appbar";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBlog } from "../hooks";
import Spinner from "../components/Spinner";
import EditPublishLayout from "../layouts/EditPublishLayout";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { blog, loading, editBlog } = useBlog({ id: id || "" });

  async function finishEdit({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) {
    if (title.trim() && content.trim()) {
      const response = await editBlog({ id: blog.id, title, content });
      if (response) {
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.info(response);
          navigate(`/blog/${response?.id}`);
        }
      }
    } else {
      toast.error("Post title & content cannot be empty.");
    }
  }
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <EditPublishLayout
          defaultTitle={blog.title}
          defaultContent={blog.content}
          submitFunctionName={"Finish Edit"}
          submitFunction={finishEdit}
        />
      )}
    </>
  );
};

export default Edit;
