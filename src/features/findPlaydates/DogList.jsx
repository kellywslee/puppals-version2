import { useSearchParams } from 'react-router-dom';
import { Hearts } from 'react-loader-spinner';
import { toast } from 'react-hot-toast';
import { useAllDogs } from '../../hooks/useDogs';
import MiniProfile from './MiniProfile';

const DogList = () => {
  const { dogs, isLoading, error } = useAllDogs();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const sizeFilters = searchParams.get('size')?.split(',') || [];
  const energyLevelFilters = searchParams.get('energyLevel')?.split(',') || [];

  if (isLoading) return <Hearts color="#ffbf69" />;
  if (error) return toast.error('Error loading dogs');

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

  return (
    <section className="flex w-full flex-col gap-2">
      {filteredDogs.length ? (
        filteredDogs.map((dog) => <MiniProfile key={dog.id} dog={dog} />)
      ) : (
        <p>No matches found. 🥲 Try adjusting your filters.</p>
      )}
    </section>
  );
};

export default DogList;
