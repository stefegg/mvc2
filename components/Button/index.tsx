const Button = ({
  text,
  className,
  onClick,
  disabled,
}: {
  text: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`bg-transparent px-4 py-2 cursor-pointer ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default Button;
