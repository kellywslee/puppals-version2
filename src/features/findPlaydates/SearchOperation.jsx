import Filter from './Filter';
import SortBy from './SortBy';

const SearchOperation = () => {
  return (
    <form className="flex w-full gap-2">
      <Filter
        filterField="energyLevel"
        options={[{ value: 'Low' }, { value: 'Moderate' }, { value: 'High' }]}
      />
      <Filter
        filterField="size"
        options={[{ value: 'Small' }, { value: 'Medium' }, { value: 'Large' }]}
      />
      <SortBy
        options={[
          { value: 'distance-asc', label: 'Sort by distance' },
          { value: 'age-asc', label: 'Sort by age' },
          { value: 'age-desc', label: 'Sort by age (desc)' },
          { value: 'size-asc', label: 'Sort by size' },
          { value: 'size-desc', label: 'Sort by size (desc)' },
        ]}
      />
    </form>
  );
};

export default SearchOperation;
