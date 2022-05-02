const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  value,
  type,
  disabled,
}) => {
  return (
    <input
      className='mt-1 flex h-12 w-full cursor-default flex-nowrap content-center items-center justify-between rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-none sm:text-sm'
      placeholder={placeholder}
      value={value && value}
      onChange={onChange}
      type={type && type}
      disabled={disabled}
    />
  );
};

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
}

export default Input;
