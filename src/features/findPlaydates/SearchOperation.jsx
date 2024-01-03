import Filter from './Filter';
import Search from '../../ui/Search';
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
            { value: 'distance-asc', label: 'Sort by Closest 🐶' },
            { value: 'dateOfBirth-asc', label: 'Puppies first' },
            { value: 'dateOfBirth-desc', label: 'Elders first' },
            { value: 'size-asc', label: 'Little paws 🐾 first' },
            { value: 'size-desc', label: 'Big paws 🐾 first' },
          ]}
        />
      </div>
    </form>
  );
};

export default SearchOperation;
