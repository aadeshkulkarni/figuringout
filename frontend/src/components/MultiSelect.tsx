/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useRef, useState } from 'react';

export interface Option {
  text: string;
  value: string;
}

// TODO: Component refactoring for resusuablity.
const MultiSelectDropdown = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: {
  options: Option[];
  selectedOptions: Option[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[]>>;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRemoveOption = (option: Option) => {
    setSelectedOptions(selectedOptions.filter((o: Option) => o.value !== option.value));
  };

  const handleSelectOption = (option: Option) => {
    if (selectedOptions.length < 5 && !selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto" ref={dropdownRef}>
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
              <div className="flex flex-auto flex-wrap">
                {selectedOptions.map((option: Option) => (
                  <div
                    key={option.value}
                    className="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300"
                  >
                    <div className="text-xs font-normal leading-none max-w-full flex-initial">{option.text}</div>

                    <div className="flex flex-auto flex-row-reverse">
                      <div onClick={() => handleRemoveOption(option)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-x cursor-pointer hover:text-teal-400 rounded-full w-4 h-4 ml-2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>

                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex-1">
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </div>
              </div>

              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
                <button
                  onClick={handleToggleDropdown}
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-chevron-up w-4 h-4"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {showDropdown && (
            <div className="pt-1">
              <div className="absolute shadow top-100 bg-white z-40 w-full h-[300px] left-0 rounded max-h-select overflow-y-auto">
                <div className="flex flex-col w-full">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className="cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100"
                      onClick={() => handleSelectOption(option)}
                    >
                      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                        <div className="w-full items-center flex">
                          <div className="mx-2 leading-6">{option.text}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
