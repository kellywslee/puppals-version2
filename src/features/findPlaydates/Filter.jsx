/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';
import { camelToTitle } from '../../utils/helpers';

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
    <fieldset className="flex rounded-lg border-none p-1">
      <legend className="mb-1 text-sm font-semibold">
        {camelToTitle(filterField)}
      </legend>
      {options.map((option) => (
        <div key={option.value} className="mb-1 flex items-center">
          <input
            type="checkbox"
            id={`${filterField}-${option.value}`}
            value={option.value}
            onChange={(e) => handleChange(option.value, e.target.checked)}
            checked={searchParams
              .get(filterField)
              ?.split(',')
              .includes(option.value)}
            className="h-3 w-3 rounded-lg border-slate-950 accent-org focus:ring-teal-600"
          />
          <label
            htmlFor={`${filterField}-${option.value}`}
            className="ml-1 mr-1 text-xs"
          >
            {option.value}
          </label>
        </div>
      ))}
    </fieldset>
  );
};

export default Filter;
