import { ChangeEvent } from 'react';

interface TextAreaFieldType {
  id?: string;
  label: string;
  value: string;
  rows?: number;
  placeholder: string;
  suffix?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const TextAreaField = ({ id, label, suffix, value, rows = 2, onChange }: TextAreaFieldType) => {
  return (
    <div className="w-full text-left my-4">
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <textarea
        name="Text1"
        className="w-full resize-none p-3 border rounded border-gray-100 bg-gray-100"
        rows={rows}
        value={value}
        onChange={onChange}
      ></textarea>
      <label className="text-gray-600 text-xs">{suffix}</label>
    </div>
  );
};
export default TextAreaField;
