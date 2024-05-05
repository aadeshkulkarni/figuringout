interface TooltipProps {
  message: string;
  children?: () => void;
}
const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div class="group relative flex">
      <span class="absolute bottom-full bg-white z-50 scale-0 transition-all rounded p-2 text-s text-black group-hover:scale-100 border">
        {message}
      </span>
      {children}
    </div>
  );
};
export default Tooltip;
