import { toast } from 'react-hot-toast';
import { BsCircleFill } from 'react-icons/bs';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import {
  capitalizeFirstLetter,
  capitalizeAllLetters,
  calculateAge,
} from '../../utils/helpers';
import EditProfile from './EditProfile';
import Spinner from '../../ui/Spinner';

const UserDogProfile = () => {
  const { user } = useUser();
  const { myDog, isLoading, error } = useMyDog(user.id);

  if (isLoading) return <Spinner />;

  if (error) return toast.error('Error fetching dog profile');

  const defaultDogData = {
    image: `https://${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/dogImage/defalut_image.png`,
    name: 'Your Dog',
    breed: 'Not specified',
    isActive: false,
    sex: 'Not specified',
    dateOfBirth: 'Not specified',
    size: 'Not specified',
    postalCode: 'Not specified',
    energyLevel: 'Not specified',
    nameOfPawrents: user.name || 'Not specified',
    message: 'No message yet',
  };

  const dogData = myDog[0] || defaultDogData;

  return (
    <section className="w-11/12 rounded-lg border-2 p-4">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="mb-2 text-lg">My Dog&apos;s Profile</h2>
        <EditProfile />
      </div>
      <ul className="grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-4 gap-y-2">
        <li className="col-span-2 row-span-3 place-self-center">
          <img
            src={myDog[0]?.image}
            alt={`${dogData.name} the ${dogData.breed} dog`}
            className="h-28 w-28 rounded-xl object-cover"
          />
        </li>
        <li className="col-span-2 text-xl font-bold">{dogData.name}</li>
        <li className="col-span-2 flex items-center">
          <BsCircleFill
            className={`${
              dogData.isActive ? 'text-green2' : 'text-red-600'
            } mr-2`}
          />
          {dogData.isActive ? 'Active' : 'Inactive'}
        </li>
        <li>{dogData.sex}</li>
        <li>{calculateAge(dogData.dateOfBirth)}</li>
        <li className="col-span-2">
          <span className="font-bold">Size: </span>
          {dogData.size}
        </li>
        <li className="col-span-2">
          <span className="font-bold">Postal Code: </span>
          {capitalizeAllLetters(dogData.postalCode)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Breed: </span>
          {dogData.breed}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Energy Level: </span>
          {dogData.energyLevel}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Name of Pawrents: </span>
          {capitalizeFirstLetter(dogData.nameOfPawrents)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Message: </span>
          {dogData.message}
        </li>
      </ul>
    </section>
  );
};

export default UserDogProfile;
