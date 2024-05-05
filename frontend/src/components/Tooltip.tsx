import { ReactNode } from "react";

interface TooltipProps {
  message: string;
  children?: ReactNode;
}
const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className="group relative flex">
      <span className="absolute bottom-full bg-white z-50 scale-0 transition-all rounded p-2 text-s text-black group-hover:scale-100 border">
        {message}
      </span>
      {children}
    </div>
  );
};
export default Tooltip;
