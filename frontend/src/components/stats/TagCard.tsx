const TagCard = ({ tagList }: { tagList: [] | undefined }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full xs:w-full mb-2 lg:p-8 md:p-6 sm:p-4 ">
      <div className="flex flex-col h-28 col-span-12 md:col-span-3 transform transition-transform duration-300 hover:scale-105 border rounded-md shadow-sm text-main bg-main">
        <div className="text-left p-4">
          <h4 className="text-lg font-medium text-nowrap overflow-hidden text-ellipsis">Top Tags</h4>
          {tagList?.map((tags, index) => {
            return (
              <div
                key={index}
                className="flex justify-center max-w-fit items-center m-1 font-medium py-1 px-2 bg-transparent rounded-full text-whi bg-gray-100 border"
              >
                <span className="text-xs font-normal leading-none max-w-full flex-initial">{tags['tagName']}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagCard;
