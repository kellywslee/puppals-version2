import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const handleSearchChange = (event) => {
    setSearchParams({ search: event.target.value });
  };

  return (
    <input
      className="flex h-8 w-1/2 max-w-96 items-center rounded-lg border-1 border-gray-300 p-2 font-sans text-sm outline-slate-950 placeholder:font-sans"
      type="search"
      placeholder="Search dogs by name or breed"
      value={searchQuery}
      onChange={handleSearchChange}
    />
  );
};

export default Search;
