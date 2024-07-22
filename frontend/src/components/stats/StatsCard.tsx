const StatsCard = ({ data, name }: { data: number | undefined; name: string }) => {
  return (
    <div className="lg:w-1/4 md:w-1/2 sm:w-full mb-2 lg:p-8 md:p-6 sm:p-4">
      <div className="flex flex-col h-28 col-span-12 md:col-span-3 transform transition-transform duration-300 hover:scale-105 border rounded-md shadow-sm text-main bg-main">
        <div className="text-left p-4">
          <h4 className="text font-medium text-nowrap overflow-hidden text-ellipsis">{name}</h4>
          <h2 className="text-lg font-medium text-nowrap overflow-hidden text-ellipsis">{data}</h2>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
