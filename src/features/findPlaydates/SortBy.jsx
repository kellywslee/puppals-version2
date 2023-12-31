import { useSearchParams } from 'react-router-dom';
import Select from './Select';

// eslint-disable-next-line react/prop-types
const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} value={sortBy} onChange={handleChange} />;
};

export default SortBy;
