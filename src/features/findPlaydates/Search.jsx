import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const handleSearchChange = (event) => {
    setSearchParams({ search: event.target.value });
  };

  return (
    <div className="flex items-center justify-center">
      <input
        className="flex h-8 items-center rounded-lg border-1 border-gray-300 p-2 font-sans text-sm outline-slate-950 placeholder:font-sans"
        type="search"
        placeholder="Search Dogs"
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default Search;
