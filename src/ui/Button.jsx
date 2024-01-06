// eslint-disable-next-line react/prop-types
const Button = ({ children, disabled, type, onClick }) => {
  const base =
    'inline-block text-nowrap bg-org text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-amber-300 disabled:cursor-not-allowed active:bg-amber-200';

  const styles = {
    primary: base + ' w-11/12 max-w-28 rounded-lg text-xs p-1 lg:p-2',
    secondary:
      base +
      ' z-40 absolute bottom-3 left-3 rounded-lg border-2 border-slate-950 p-1 text-xs',
    special:
      base +
      ' rounded-xl border-2 border-slate-950 px-3 py-2 tracking-wide  shadow-sp shadow-slate-950  active:translate-y-1 active:shadow-none',
    edit: base + ' text-xs rounded-lg p-1 w-full max-w-28',
    profileEdit: base + ' w-full rounded-lg text-xs p-1 lg:p-2 md:text-sm h-8',
    outline:
      'inline-block text-nowrap w-full bg-slate-50 border-2 border-org rounded-lg text-sm font-semibold text-slate-950 transition-all duration-300 hover:bg-amber-300 disabled:cursor-not-allowed active:bg-amber-200 text-xs md:text-sm h-8',
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
