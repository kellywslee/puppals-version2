const Select = ({ options, value, onChange, ...props }) => {
  return (
    <select className="flex " value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
