import Filter from './Filter';
import Search from './Search';
import SortBy from './SortBy';

const SearchOperation = () => {
  return (
    <form className="lg:flex-end flex w-full flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex justify-around gap-2 md:justify-start lg:w-1/2 lg:justify-between">
        <Filter
          filterField="size"
          options={[
            { value: 'Small' },
            { value: 'Medium' },
            { value: 'Large' },
          ]}
        />
        <Filter
          filterField="energyLevel"
          options={[{ value: 'Low' }, { value: 'Moderate' }, { value: 'High' }]}
        />
      </div>
      <div className="flex justify-between gap-2 lg:w-1/2">
        <Search />
        <SortBy
          options={[
            { value: 'distance-asc', label: 'Sort by distance' },
            { value: 'age-asc', label: 'Sort by age' },
            { value: 'age-desc', label: 'Sort by age (desc)' },
            { value: 'size-asc', label: 'Sort by size' },
            { value: 'size-desc', label: 'Sort by size (desc)' },
          ]}
        />
      </div>
    </form>
  );
};

export default SearchOperation;
