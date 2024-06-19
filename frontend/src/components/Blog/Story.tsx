import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { useBlog } from './../../hooks';
import { useNavigate, useParams } from 'react-router-dom';
import BookmarkIcon from '../icons/Bookmark';
import BookmarkSolid from '../icons/BookmarkSolid';
import Tooltip from '../Tooltip';
import Modal from '../Modal';
import 'react-quill/dist/quill.bubble.css';
import RemoveIcon from '../icons/Remove';
import EditIcon from '../icons/Edit';
import SingleBlogSkeleton from '../../skeletons/SingleBlogSkeleton';
import { Tags } from '../Tags';
import ClapButton from '../ClapButton';
import Avatar from '../Avatar';
import { formatDateString } from '../../util/string';
import VoiceOver from '../VoiceOver';
import { getPlainTextFromHTML } from '../../util/string';
import ChatModule from '../ChatModule';

const Story = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blog, loading } = useBlog({
    id: id || '',
  });

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (blog && blog.bookmarkId !== undefined) {
      setIsBookmarked(!!blog.bookmarkId);
    }
  }, [blog]);
  function handleClickOnAvatar() {
    navigate(`/profile/${blog?.author?.id}`);
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center p-4 md:px-10">
        <SingleBlogSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 md:px-10">
      <div className="p-4 max-w-[680px]">
        <div className="text-xl md:text-4xl font-extrabold py-4 line-clamp-4">{blog?.title}</div>
        <AuthorBox
          name={blog?.author?.name}
          details={blog?.author?.details}
          profilePic={blog?.author?.profilePic}
          publishedDate={blog?.publishedDate}
          handleClickOnAvatar={handleClickOnAvatar}
        />
        <ActionBox isBookmarked={isBookmarked} setIsBookmarked={setIsBookmarked} />
        <div className="pt-4">
          <VoiceOver content={getPlainTextFromHTML(blog?.content)} />
        </div>
        <div className="py-4">
          <ReactQuill value={blog?.content} readOnly={true} theme={'bubble'} />
        </div>
        <ChatModule />
      </div>
      <Tags />
    </div>
  );
};

interface ActionBoxProps {
  isBookmarked: boolean;
  setIsBookmarked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionBox: React.FC<ActionBoxProps> = ({ isBookmarked, setIsBookmarked }) => {
  const navigate = useNavigate();
  const [openUnbookmarkModal, setOpenUnbookmarkModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { id } = useParams();
  const { blog, loading, deleteBlog, bookmarkBlog, unbookmarkBlog, submittingBookmark, likeBlog } = useBlog({
    id: id || '',
  });
  const [bookmarking, setBookmarking] = useState(false);

  if (loading) return null;

  const user = JSON.parse(localStorage.getItem('user') || '{}') || {};
  const isAuthor = user?.id && user?.id === blog?.author?.id;

  const deleteStory = async () => {
    if (id) {
      const message = await deleteBlog(id);
      toast.info(message);
      navigate('/blogs');
    }
  };

  const bookmarkPost = async () => {
    setBookmarking(true);
    await bookmarkBlog();
    setIsBookmarked(true);
    setBookmarking(false);
  };

  const unbookmarkPost = () => {
    setOpenUnbookmarkModal(true);
  };

  const onConfirmUnbookmark = async () => {
    await unbookmarkBlog(blog.bookmarkId!);
    setIsBookmarked(false);
    setOpenUnbookmarkModal(false);
  };

  const onConfirmDelete = () => {
    deleteStory();
    setOpenDeleteModal(false);
  };

  const beginEditStory = () => {
    navigate(`/edit/${blog.id}`);
  };

  const determineBookmarkView = () => {
    if (bookmarking || submittingBookmark) {
      return (
        <div className="w-10 h-10 p-2 cursor-pointer text-gray-400">
          <BookmarkSolid />
        </div>
      );
    }
    if (!isBookmarked) {
      return (
        <Tooltip message="Save">
          <div onClick={bookmarkPost} className="w-10 h-10 p-2 cursor-pointer">
            <BookmarkIcon />
          </div>
        </Tooltip>
      );
    }
    return (
      <Tooltip message="Unsave">
        <div onClick={unbookmarkPost} className="w-10 h-10 p-2 cursor-pointer text-gray-900">
          <BookmarkSolid />
        </div>
      </Tooltip>
    );
  };

  return (
    <div className="text-slate-500 py-2 items-center justify-between flex border-y border-slate-200">
      <div className="text-sm">
        <ClapButton clapCount={blog?.claps?.length || 0} handleClap={likeBlog} />
      </div>
      <div className="flex justify-center items-center">
        {determineBookmarkView()}
        {isAuthor && (
          <>
            <Tooltip message="Edit">
              <button
                onClick={beginEditStory}
                type="button"
                name="edit-story"
                className="focus:outline-none font-medium rounded-lg text-sm px-4"
              >
                <EditIcon />
              </button>
            </Tooltip>
            <Tooltip message="Remove">
              <button
                onClick={() => setOpenDeleteModal(true)}
                type="button"
                name="delete-story"
                className="focus:outline-none font-medium rounded-lg text-sm px-2"
              >
                <RemoveIcon />
              </button>
            </Tooltip>
          </>
        )}
      </div>
      <Modal
        message={'Are you sure that you want to unbookmark this post?'}
        openModal={openUnbookmarkModal}
        onConfirm={onConfirmUnbookmark}
        onCloseModal={() => setOpenUnbookmarkModal(false)}
      />
      <Modal
        message={'Are you sure that you want to delete this post?'}
        openModal={openDeleteModal}
        onConfirm={onConfirmDelete}
        onCloseModal={() => setOpenDeleteModal(false)}
      />
    </div>
  );
};

const AuthorBox = ({
  name,
  details,
  profilePic,
  publishedDate,
  handleClickOnAvatar,
}: {
  name: string;
  details: string | undefined;
  publishedDate: string;
  profilePic?: string;
  handleClickOnAvatar: React.MouseEventHandler<HTMLDivElement>;
}) => (
  <div className="p-4">
    <div className="flex items-center gap-4 py-4">
      <Avatar name={name || 'Anonymous'} onClick={handleClickOnAvatar} imageSrc={profilePic} />
      <div>
        <div className="font-bold">{name || 'Anonymous'}</div>
        <div>
          <span>{details ? details : 'An artist at living. My work of art is my life.'} </span> ·{' '}
          <span className="text-sm text-slate-500">{formatDateString(publishedDate)}</span>
        </div>
      </div>
    </div>
  </div>
);

export default Story;
