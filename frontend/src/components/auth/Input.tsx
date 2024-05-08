import { InputTypes } from "../../interface";

import { IoMdEyeOff, IoMdEye } from "react-icons/io";

const Input = ({
  type,
  error,
  isIcon,
  register,
  isVisible,
  placeholder,
  onToggle,
}: InputTypes) => {
  return (
    <div
      className={`w-full border rounded-lg bg-white border-gray-400
      ${isIcon ? "flex items-center justify-between" : ""}
       ${error ? "border-red-600" : ""}
        `}>
      <input
        {...register}
        type={type ? "text" : "password"}
        placeholder={placeholder}
        className='w-full text-gray-800 text-sm border-none outline-none font-medium bg-white p-4 rounded-lg'
      />
      {isIcon && (
        <div>
          {isVisible ? (
            <IoMdEye onClick={onToggle} className='cursor-pointer mr-4' />
          ) : (
            <IoMdEyeOff onClick={onToggle} className='cursor-pointer mr-4' />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
