/* eslint-disable react/prop-types */
import { useSearchParams } from 'react-router-dom';
import { camelToTitle } from '../../utils/helpers';

const Filter = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sizeToWeightQuery = {
    Small: 'size<20',
    Medium: 'size>=20&size<=60',
    Large: 'size>60',
  };

  const handleChange = (value, isChecked) => {
    let currentValues = searchParams.get(filterField)?.split(',') || [];

    if (filterField === 'size') {
      currentValues = currentValues.map((val) => sizeToWeightQuery[val] || val);
    }

    if (isChecked) {
      // Add the mapped value for weight or the original value for other fields
      const valueToAdd =
        filterField === 'size' ? sizeToWeightQuery[value] : value;
      currentValues.push(valueToAdd);
    } else {
      // Remove the value or its mapped counterpart
      const valueToRemove =
        filterField === 'size' ? sizeToWeightQuery[value] : value;
      const index = currentValues.indexOf(valueToRemove);
      if (index > -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0) {
      searchParams.set(filterField, currentValues.join(','));
    } else {
      searchParams.delete(filterField);
    }
    setSearchParams(searchParams);
  };

  return (
    <fieldset className="flex w-1/2 rounded-lg border-none p-1">
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
              .includes(
                filterField === 'size'
                  ? sizeToWeightQuery[option.value]
                  : option.value,
              )}
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
