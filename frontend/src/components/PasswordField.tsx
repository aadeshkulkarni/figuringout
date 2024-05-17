import { useState, ChangeEvent } from "react";
import PasswordEyeIcon from "./icons/PasswordEyeIcon";

interface InputFieldType {
  id?: string;
  label: string;
  type?: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({ id, label, type, placeholder, onChange }: InputFieldType) => {
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
          <PasswordEyeIcon inputType={inputType} />
        </button>
      )}
    </div>
  );
};

export default PasswordField;
