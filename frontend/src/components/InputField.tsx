import { useState, ChangeEvent } from "react";

interface InputFieldType {
  id?: string;
  label: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ id, label, type, placeholder, onChange }: InputFieldType) => {
  const [inputType, setInputType] = useState(type || "text");
  
  const handleTogglePassword = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="w-full text-left my-4 relative">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={inputType}
        id={id}
        onChange={onChange}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 ${
          type === "password" ? "pr-10" : ""
        }`}
        placeholder={placeholder}
        required
      />
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-8 right-0 p-3.5 rounded-e-md"
        >
          <svg
            className="flex-shrink-0 size-3.5 text-gray-400"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path className={inputType === "password" ? "block" : "hidden"} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
            <path className={inputType === "password" ? "block" : "hidden"} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
            <path className={inputType === "password" ? "block" : "hidden"} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
            <line className={inputType === "password" ? "block" : "hidden"} x1="2" x2="22" y1="2" y2="22"></line>
            <path className={inputType === "text" ? "block" : "hidden"} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle className={inputType === "text" ? "block" : "hidden"} cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      )}
    </div>
  );
};

export default InputField;
