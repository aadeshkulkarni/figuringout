import ReactQuill from "react-quill";
import Appbar from "../components/Appbar";
import { Avatar } from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";
import BookmarkIcon from "../components/icons/Bookmark";
import BookmarkSolid from "../components/icons/BookmarkSolid";
import Tooltip from "../components/Tooltip";
import Modal from "../components/Modal";
import { useState } from "react";

const Blog = () => {
  const navigate = useNavigate();
  const [openUnbookmarkModal, setOpenUnbookmarkModal] = useState(false);

  const { id } = useParams();
  const { blog, loading, deleteBlog, bookmarkBlog, unbookmarkBlog } = useBlog({
    id: id || "",
  });
  const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
  const isAuthor = user?.id === blog?.author?.id;
  const deleteStory = async () => {
    if (id) {
      const message = await deleteBlog(id);
      toast.info(message);
      navigate("/blogs");
    }
  };

  const bookmarkPost = () => {
    bookmarkBlog();
  };

  const unbookmarkPost = () => {
    setOpenUnbookmarkModal(true);
  };

  const onConfirmUnbookmark = () => {
    unbookmarkBlog();
    setOpenUnbookmarkModal(false);
  };

  const beginEditStory = () => {
    navigate(`/edit/${blog.id}`);
  };
  return (
    <>
      <Appbar />
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-12 p-4 md:px-10">
          <div className="md:col-span-1"></div>
          <div className="order-2 md:order-1 col-span-12 md:col-span-7 md:p-4 md:border-r">
            <div className="text-xl md:text-5xl font-extrabold">
              {blog?.title}
            </div>
            <div className="text-lg font-light text-slate-500 py-4 items-center justify-between flex">
              Post on {blog?.publishedDate}
              {isAuthor && (
                <div className="flex items-center">
                  <button
                    onClick={beginEditStory}
                    type="button"
                    className="focus:outline-none text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-12"
                  >
                    Edit story
                  </button>
                  <button
                    onClick={deleteStory}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mx-12"
                  >
                    Delete story
                  </button>
                  {!blog.userBookmarked ? (
                    <Tooltip message="Bookmark post">
                      <BookmarkIcon
                        onClickIcon={bookmarkPost}
                        className="w-6 h-6 cursor-pointer"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip message="Unbookmark post">
                      <BookmarkSolid
                        onClickIcon={unbookmarkPost}
                        className="w-6 h-6 cursor-pointer"
                      />
                    </Tooltip>
                  )}
                </div>
              )}
            </div>
            <div className="py-4">
              <ReactQuill
                value={blog?.content}
                readOnly={true}
                theme={"bubble"}
              />
            </div>
          </div>
          <div className="order-1 md:order-2 col-span-12 md:col-span-2 p-4">
            Author
            <div className="flex items-center gap-4 py-4">
              <Avatar name={blog?.author?.name || "Anonymous"} />
              <div>
                <div className="font-bold">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <div>An artist at living. My work of art is my life.</div>
              </div>
            </div>
          </div>
          <Modal
            message={"Are you sure that you want to unbookmark this post?"}
            openModal={openUnbookmarkModal}
            onConfirm={onConfirmUnbookmark}
            onCloseModal={() => setOpenUnbookmarkModal(false)}
          />
        </div>
      )}
    </>
  );
};

export default Blog;
