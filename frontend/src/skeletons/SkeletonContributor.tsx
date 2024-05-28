const SkeletonContributorGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, index) => (
        <SkeletonContributor key={index} />
      ))}
    </div>
  );
};

const SkeletonContributor: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-105">
      <div className="bg-gray-200 w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-pulse"></div>
      <div className="text-center">
        <h2 className="text-lg font-medium text-transparent bg-gray-200 h-6 w-32 mb-2 animate-pulse"></h2>
        <p className="text-gray-600 h-4 w-24 bg-gray-200 animate-pulse"></p>
      </div>
    </div>
  );
};

export { SkeletonContributor, SkeletonContributorGrid };

export default SkeletonContributor;
