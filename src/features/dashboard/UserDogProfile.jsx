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

  console.log('myDog', myDog);

  if (isLoading) return <Spinner />;

  if (error) return toast.error('Error fetching dog profile');

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
            alt={`${myDog[0].name} the ${myDog[0].breed} dog`}
            className="h-28 w-28 rounded-xl object-cover"
          />
        </li>
        <li className="col-span-2 text-xl font-bold">{myDog[0]?.name}</li>
        <li className="col-span-2 flex items-center">
          <BsCircleFill
            className={`${
              myDog[0]?.isActive ? 'text-green2' : 'text-red-600'
            } mr-2`}
          />
          {myDog[0]?.isActive ? 'Active' : 'Inactive'}
        </li>
        <li>{myDog[0]?.sex}</li>
        <li>{calculateAge(myDog[0]?.dateOfBirth)}</li>
        <li className="col-span-2">
          <span className="font-bold">Size: </span>
          {myDog[0]?.size}
        </li>
        <li className="col-span-2">
          <span className="font-bold">Postal Code: </span>
          {capitalizeAllLetters(myDog[0]?.postalCode)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Breed: </span>
          {myDog[0]?.breed}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Energy Level: </span>
          {myDog[0]?.energyLevel}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Name of Pawrents: </span>
          {capitalizeFirstLetter(myDog[0]?.nameOfPawrents)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Message: </span>
          {myDog[0]?.message}
        </li>
      </ul>
    </section>
  );
};

export default UserDogProfile;
