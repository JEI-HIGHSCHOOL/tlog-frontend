const Button: React.FC<ButtonProps> = ({
  onClick,
  placeholder,
  disabled = false,
  size = 'lg',
  type = 'default',
  className,
}) => {
  return (
    <button
      className={`mt-1 flex flex ${
        size === 'lg' ? 'h-12' : 'h-9'
      } w-full cursor-default content-center items-center items-center justify-center rounded-md border border-gray-300 bg-white py-2 shadow-sm ${
        type === 'default' &&
        'hover:bg-gray-100 focus:border-indigo-500 focus:ring-indigo-500'
      } ${
        type === 'cancel' &&
        'border-red-500 text-red-500 hover:bg-red-100 focus:border-red-500 focus:ring-red-500'
      } ${
        type === 'success' &&
        'border-green-500 text-green-500 hover:bg-green-100 focus:border-green-500 focus:ring-green-500'
      } transform transition duration-100 ease-in hover:-translate-y-1 focus:outline-none focus:ring-1 dark:border-none ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
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
  type?: 'cancel' | 'success' | 'default' | any;
  className?: string;
}

export default Button;
