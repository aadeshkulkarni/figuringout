const RecommendedSubscriberSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse w-full border border-main shadow-sm px-4 py-8 bg-transparent flex justify-between items-center"
    >
      <div className="flex items-center justify-between w-7/12">
        <div className="w-10 h-10 rounded-full bg-sub"></div>
        <div className="h-5 w-28 bg-sub rounded-full"></div>
      </div>
      <div className="h-6 w-14 rounded-full bg-sub"></div>
    </div>
  );
};

export default RecommendedSubscriberSkeleton;
