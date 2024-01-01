// eslint-disable-next-line react/prop-types
const Button = ({ children, disabled, type, onClick }) => {
  const base =
    'inline-block text-nowrap bg-org text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-amber-300 disabled:cursor-not-allowed active:bg-amber-200';

  const styles = {
    primary: base + ' w-full rounded-lg text-xs p-1 lg:p-2 lg:text-sm',
    secondary:
      base +
      ' z-50 absolute bottom-3 left-3 rounded-lg border-2 border-slate-950 p-1 text-xs',
    special:
      base +
      ' rounded-xl border-2 border-slate-950 px-3 py-2 tracking-wide  shadow-sp shadow-slate-950  active:translate-y-1 active:shadow-none',
    edit: base + ' text-xs rounded-lg p-1 w-full',
  };
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={styles[type]}
    >
      {children}
    </button>
  );
};

export default Button;
