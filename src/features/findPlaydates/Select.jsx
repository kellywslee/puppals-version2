const Select = ({ options, value, onChange, ...props }) => {
  return (
    <select
      className="flex h-8 w-1/2 rounded-lg border-1 border-gray-300 text-sm outline-slate-950"
      value={value}
      onChange={onChange}
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
