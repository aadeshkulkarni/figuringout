import { useState } from 'react';
import Spinner from './Spinner';

const GenerateAIBtn = ({
  onClickHandler,
}: {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClickHandler: Function;
}) => {
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const onClick = async () => {
    setLoadingGeneration(true);
    await onClickHandler();
    setLoadingGeneration(false);
  };
  return (
    <button className="px-5 py-2.5 relative rounded-full group font-medium text-white inline-block" onClick={onClick}>
      <span className="absolute top-0 left-0 w-full h-full rounded-full opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded-full opacity-50 from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded-full shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded-full bg-gradient-to-br to-purple-600 from-blue-500"></span>
      <span className="relative flex justify-center items-center">
        {' '}
        {loadingGeneration ? (
          <>
            <Spinner className="h-4 w-4 !border-2 mr-2" /> Loading ...
          </>
        ) : (
          'Generate using AI'
        )}
      </span>
    </button>
  );
};

export default GenerateAIBtn;
