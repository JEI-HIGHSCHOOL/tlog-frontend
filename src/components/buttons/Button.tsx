const Button: React.FC<ButtonProps> = ({
  onClick,
  placeholder,
  disabled = false,
  size = 'lg',
}) => {
  return (
    <button
      className={`mt-1 flex flex ${
        size === 'lg' ? 'h-12' : 'h-9'
      } w-full cursor-default content-center items-center items-center justify-center rounded-md border border-gray-300 bg-white py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {placeholder}
    </button>
  );
};

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder: string;
  disabled?: boolean;
  size?: 'sm' | 'lg';
}

export default Button;
