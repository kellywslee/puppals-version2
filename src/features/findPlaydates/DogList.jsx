import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAllDogs } from '../../hooks/useDogs';
import MiniProfile from './MiniProfile';
import Loader from '../../ui/Loader';

const DogList = () => {
  const {
    dogs,
    isLoading: isLoadingAllDogs,
    error: errorAllDogs,
  } = useAllDogs();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const sizeFilters = searchParams.get('size')?.split(',') || [];
  const energyLevelFilters = searchParams.get('energyLevel')?.split(',') || [];
  const sortBy = searchParams.get('sortBy');
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;

  if (isLoadingAllDogs) return <Loader />;
  if (errorAllDogs) {
    toast.error('Error loading dogs');
    return null;
  }

  const filteredDogs = dogs.filter((dog) => {
    // Apply search filter
    if (
      searchQuery &&
      !dog.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !dog.breed.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply size filter
    let sizeMatch = true;
    if (sizeFilters.length > 0) {
      sizeMatch = sizeFilters.some((filter) => {
        if (filter === 'size<20') return dog.size < 20;
        if (filter === 'size>=20&size<=60')
          return dog.size >= 20 && dog.size <= 60;
        if (filter === 'size>60') return dog.size > 60;
        return false;
      });
    }

    // Apply energy level filter
    let energyLevelMatch = true;
    if (energyLevelFilters.length > 0) {
      energyLevelMatch = energyLevelFilters.includes(dog.energyLevel);
    }

    return sizeMatch && energyLevelMatch;
  });

  let sortedDogs = filteredDogs;
  if (field === 'size')
    sortedDogs = filteredDogs.sort((a, b) => (a[field] - b[field]) * modifier);
  if (field === 'dateOfBirth')
    sortedDogs = filteredDogs.sort(
      (a, b) => (new Date(a[field]) - new Date(b[field])) * (modifier * -1),
    );

  return (
    <section className="flex h-44 w-full flex-col gap-2 overflow-auto md:h-96">
      {sortedDogs.length ? (
        sortedDogs.map((dog) => <MiniProfile key={dog.id} dog={dog} />)
      ) : (
        <p className="w-11/12 text-center text-sm">
          No matches found. 🥲 Try adjusting your filters.
        </p>
      )}
    </section>
  );
};

export default DogList;
