const BlogSkeleton = () => {
  return (
    <div role="status" className="animate-pulse w-full md:w-3/6 border border-gray-200 shadow-sm px-4 py-8 bg-white">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
        <div>
          <div className="h-3 w-24 bg-gray-200 rounded-full mb-2"></div>
          <div className="h-2.5 w-16 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="mt-4 h-4 w-48 bg-gray-200 rounded-full"></div>
      <div className="mt-4 h-16 w-full bg-gray-200 rounded"></div>
      <div className="mt-4 h-3 w-24 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default BlogSkeleton;
