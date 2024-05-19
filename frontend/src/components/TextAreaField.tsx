import { ChangeEvent } from "react";

interface TextAreaFieldType {
  id?: string;
  label: string;
  value: string;
  rows?: number;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField = ({
  id,
  label,
  value,
  rows = 2,
  onChange,
}: TextAreaFieldType) => {
  return (
    <div className="w-full text-left my-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <textarea
        name="Text1"
        className="w-full border resize-none p-3"
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};
export default TextAreaField;
