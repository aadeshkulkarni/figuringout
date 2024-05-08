import { FieldSetType } from "../../interface";

const FieldSet = ({ label, children, error }: FieldSetType) => {
  
  return (
    <fieldset className='w-full text-left my-4'>
     {label &&  <legend className='block mb-2 text-sm font-medium text-gray-900'>
        {label}
      </legend>}
      {children}
      {error && <p className='text-xs text-red-600 my-1'> {error} </p>}
    </fieldset>
  );
};
export default FieldSet;
