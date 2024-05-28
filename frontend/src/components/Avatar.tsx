type AvatarProps = {
  name: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const Avatar = ({ name, onClick, size = 'medium' }: AvatarProps) => {
  const getDimensions = () => {
    switch (size) {
      case 'small':
        return {
          containerSize: 'w-5 h-5',
        };
      case 'medium':
        return {
          containerSize: 'w-10 h-10',
        };
      case 'large':
        return {
          containerSize: 'w-20 h-20',
          textSize: 'text-xl',
        };
    }
  };

  const { containerSize, textSize } = getDimensions();
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer relative inline-flex items-center justify-center overflow-hidden bg-gray-200 hover:bg-gray-300 rounded-full ${containerSize}`}
    >
      <span className={`font-medium ${textSize} text-gray-600`}>
        {name.split(' ')?.[0]?.[0]}
        {name?.split(' ')?.[1]?.[0]}
      </span>
    </div>
  );
};

export default Avatar;
