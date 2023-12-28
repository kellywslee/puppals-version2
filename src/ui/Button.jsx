// eslint-disable-next-line react/prop-types
const Button = ({ children, disabled, type, onClick }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="inline-block text-nowrap rounded-xl border-2 border-slate-950 bg-org px-3 py-2 text-sm font-semibold tracking-wide text-slate-950 shadow-sp shadow-slate-950 transition-all duration-300 hover:bg-orange-400 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
};

export default Button;
