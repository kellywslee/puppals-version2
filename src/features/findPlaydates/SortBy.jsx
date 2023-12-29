import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      className="h-10 w-20"
    />
  );
};

export default SortBy;
