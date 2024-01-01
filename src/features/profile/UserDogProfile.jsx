import { toast } from 'react-hot-toast';
import { BsCircleFill } from 'react-icons/bs';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import EditProfile from './EditProfile';
import Loader from '../../ui/Loader';
import {
  capFirstLowerRest,
  capitalizeAllLetters,
  calculateAge,
} from '../../utils/helpers';

const UserDogProfile = () => {
  const { user } = useUser();
  const { myDog, isLoading, error } = useMyDog(user?.id);

  if (!user) return <Loader />;
  if (isLoading) return <Loader />;
  if (error) return toast.error('Error fetching dog profile');

  const defaultDogData = {
    image: `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/public/dogImage/defalut_image.png`,
    name: 'Your Dog',
    breed: 'Not specified',
    isActive: false,
    sex: 'M',
    dateOfBirth: '2023-01-01',
    weight: 10,
    postalCode: 'A1A 1A1',
    energyLevel: 'Low',
    nameOfPawrents: 'Not specified',
    message: 'No message yet',
  };

  const dogData = myDog[0] || defaultDogData;

  return (
    <section className="mb-4 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-1 p-3 md:mb-0 md:flex-row md:items-center md:border-none lg:gap-6">
      <h2 className="text-base md:text-center md:text-lg lg:text-xl">
        My Dog&apos;s Profile
      </h2>
      <ul className="grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-3 gap-y-1 rounded-lg border-1 p-2 text-xs md:w-3/4 md:p-4 lg:text-sm">
        <li className="col-span-1 row-span-4 place-self-start">
          <img
            src={dogData.image}
            alt={`${dogData.name} the ${dogData.breed} dog`}
            className="h-28 w-28 rounded-xl object-cover"
          />
        </li>
        <li className="col-span-3 text-lg font-bold">
          {capFirstLowerRest(dogData.name)}
        </li>
        <li className="col-span-3 flex items-center">
          <BsCircleFill
            className={`${
              dogData.isActive ? 'text-green2' : 'text-red-600'
            } mr-2`}
          />
          {dogData.isActive ? 'Active' : 'Inactive'}
        </li>
        <li>{dogData.sex}</li>
        <li>{calculateAge(dogData.dateOfBirth)}</li>
        <li>{dogData.size}&nbsp;lb</li>
        <li className="col-span-3">
          {capitalizeAllLetters(dogData.postalCode)}
        </li>
        <li className="col-span-1 flex items-center justify-start">
          <EditProfile dogToEdit={myDog[0]} />
        </li>
        <li className="col-span-3 ">
          <span className="font-bold">Energy Level: </span>
          {dogData.energyLevel}
        </li>
        <li className="col-span-4 overflow-hidden ">
          <span className="font-bold">Breed: </span>
          {dogData.breed}
        </li>

        <li className="col-span-4 ">
          <span className="font-bold">Name of Pawrents: </span>
          {capFirstLowerRest(dogData.nameOfPawrents)}
        </li>
        <li className="col-span-4 ">
          <span className="font-bold">Message: </span>
          {dogData.message}
        </li>
      </ul>
    </section>
  );
};

export default UserDogProfile;
