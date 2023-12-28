/* eslint-disable react/prop-types */
const Input = ({
  label,
  register,
  required,
  pattern,
  type,
  placeholder,
  disabled,
  minLength,
  validate,
  error,
}) => {
  return (
    <>
      <input
        aria-label={label}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        minLength={minLength?.value}
        className="h-10 w-full border-b-1 border-slate-950 p-2 placeholder:text-sm invalid:border-red-600"
        {...register(label, {
          required,
          pattern,
          minLength,
          validate,
        })}
      />
      {error && (
        <p className="self-start text-xs text-red-600">{error.message}</p>
      )}
    </>
  );
};

export default Input;
