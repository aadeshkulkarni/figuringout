import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import { BlogType } from "../pages/Blogs";

type BookmarkTabProps = {
  bookmarks: BlogType[];
};
const BookmarkTab = ({ bookmarks }: BookmarkTabProps) => {
  return (
    <div className="p-4 md:p-10 ">
      <h1 className="text-2xl font-bold mb-2">Bookmarks</h1>
      <div className="flex flex-col justify-center items-center bg-gray-50">
        {bookmarks.length > 0 &&
          bookmarks.map((bookmark: BlogType) => (
            <BlogCard
              id={bookmark?.id}
              author={bookmark?.author}
              publishedDate={bookmark?.publishedDate}
              title={bookmark?.title}
              content={bookmark?.content}
            />
          ))}
      </div>
      {bookmarks.length === 0 && (
        <div className="flex justify-center mt-10">
          <h6 className="text-xl font-bold py-2">
            No bookmarks yet! You can bookmark blogs in the blogs page{" "}
            <Link to="/signin" className="underline">
              here
            </Link>
          </h6>
        </div>
      )}
    </div>
  );
};

export default BookmarkTab;
