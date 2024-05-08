import { ButtonType } from "../../interface";

const Button = ({ children, isSubmit, type }: ButtonType) => {
  return (
    <button
      type={type}
      disabled={isSubmit}
      className='w-full bg-black text-white p-4 rounded-lg hover:bg-white hover:text-black border border-black transition-all'>
      {children}
    </button>
  );
};

export default Button;
