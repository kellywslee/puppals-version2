import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAllDogs } from '../../hooks/useDogs';
import { calDistance } from '../../utils/helpers';
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
  const sortBy = searchParams.get('sortBy') || 'distance-asc';
  const [field, direction] = sortBy ? sortBy.split('-') : [null, null];
  const modifier = direction === 'asc' ? 1 : -1;

  if (isLoadingAllDogs) return <Loader />;
  if (errorAllDogs || !dogs) {
    toast.error('Error loading dogs');
    return null;
  }

  const userLat = searchParams.get('lat');
  const userLng = searchParams.get('lng');
  const originCoordinates =
    userLat && userLng
      ? [parseFloat(userLat), parseFloat(userLng)]
      : [43.64, -79.4];
  const dogsWithDistance = dogs
    ? dogs.map((dog) => ({
        ...dog,
        distance: parseFloat(
          calDistance(originCoordinates, [dog.lat, dog.lng]),
        ).toFixed(1),
      }))
    : [];

  const filteredDogs = dogsWithDistance.filter((dog) => {
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

  // Sort dogs
  let sortedDogs = [...filteredDogs];
  if (field === 'distance') {
    sortedDogs.sort((a, b) => (a.distance - b.distance) * modifier);
  } else if (field === 'size') {
    sortedDogs.sort((a, b) => (a.size - b.size) * modifier);
  } else if (field === 'dateOfBirth') {
    sortedDogs.sort(
      (a, b) =>
        (new Date(a.dateOfBirth) - new Date(b.dateOfBirth)) * modifier * -1,
    );
  }

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
