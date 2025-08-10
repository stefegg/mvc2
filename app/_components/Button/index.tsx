const Button = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={`rounded-md px-4 py-2 cursor-pointer ${className || ""}`}
    >
      {text}
    </button>
  );
};
export default Button;
