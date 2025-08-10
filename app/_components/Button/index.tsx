const Button = ({ text, className }: { text: string; className?: string }) => {
  return (
    <button
      className={`bg-transparent text-white px-4 py-2 cursor-pointer ${className || ""}`}
    >
      {text}
    </button>
  );
};
export default Button;
