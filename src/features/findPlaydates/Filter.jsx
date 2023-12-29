/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (value, isChecked) => {
    // Get the current values for the filter or an empty array
    const currentValues = searchParams.get(filterField)?.split(',') || [];

    if (isChecked) {
      // Add the value to the array
      currentValues.push(value);
    } else {
      // Remove the value from the array
      const valueIndex = currentValues.indexOf(value);
      if (valueIndex > -1) {
        currentValues.splice(valueIndex, 1);
      }
    }

    // Update the search params
    if (currentValues.length > 0) {
      searchParams.set(filterField, currentValues.join(','));
    } else {
      searchParams.delete(filterField);
    }
    setSearchParams(searchParams);
  };

  return (
    <fieldset className="flex flex-col rounded-lg border border-gray-200 p-4">
      <legend className="mb-2 text-lg font-semibold">{filterField}</legend>
      {options.map((option) => (
        <div key={option.value} className="mb-2 flex items-center">
          <input
            type="checkbox"
            id={`${filterField}-${option.value}`}
            value={option.value}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            checked={searchParams
              .get(filterField)
              ?.split(',')
              .includes(option.value)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor={`${filterField}-${option.value}`}
            className="ml-2 text-sm"
          >
            {option.value}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default Filter;
