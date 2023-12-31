/* eslint-disable react/prop-types */
import { Link, useSearchParams } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { Hearts } from 'react-loader-spinner';
// import { useUser } from '../../hooks/useAuth';
// import { useMyDog } from '../../hooks/useDogs';
import { calculateAge, calDistance } from '../../utils/helpers';

const MiniProfile = ({ dog }) => {
  const [searchParams] = useSearchParams();
  const userLat = searchParams.get('lat');
  const userLng = searchParams.get('lng');
  // const { user } = useUser();
  // const { myDog, isLoading, error } = useMyDog(user?.id);

  const DEFAULT_COORDINATES = [43.64, -79.4];

  // if (isLoading)
  //   return (
  //     <Hearts
  //       color="#ffbf69"
  //       wrapperStyle={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100vh',
  //       }}
  //     />
  //   );
  // if (error) return toast.error('Error fetching dog profile');

  const originCoordinates =
    userLat && userLng
      ? [parseFloat(userLat), parseFloat(userLng)]
      : DEFAULT_COORDINATES;

  const distance = parseFloat(
    calDistance(originCoordinates, [dog?.lat, dog?.lng]),
  ).toFixed(1);

  return (
    <Link to={`/findplaydates/dogs/${dog.id}?lat=${dog.lat}&lng=${dog.lng}`}>
      <ul className="grid w-full grid-cols-profile grid-rows-3 rounded-lg border-1 border-gray-300 p-2 text-xs hover:border-org">
        <li className="row-span-3 place-self-center">
          <img
            src={dog?.image}
            alt={`${dog.name} the ${dog.breed} dog`}
            className=" h-12 w-12 rounded-full object-cover"
          />
        </li>
        <li className="col-span-4 text-sm font-bold">{dog?.name}</li>
        <li className="col-span-4">{dog?.breed}</li>
        <li>{dog?.sex}</li>
        <li>{calculateAge(dog?.dateOfBirth)}</li>
        <li>{dog?.size} lb</li>
        <li>{distance} km</li>
      </ul>
    </Link>
  );
};

export default MiniProfile;
