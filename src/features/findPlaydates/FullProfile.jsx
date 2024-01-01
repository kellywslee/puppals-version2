import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  capFirstLowerRest,
  capitalizeAllLetters,
  calculateAge,
} from '../../utils/helpers';
import { ImCross } from 'react-icons/im';
import { BsCircleFill } from 'react-icons/bs';
// import { PiPaperPlaneTiltBold } from 'react-icons/pi';
// import { MdAddReaction } from 'react-icons/md';

import { useDog } from '../../hooks/useDogs';
// import ProfileCard from '../../ui/ProfileCard';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';

const FullProfile = () => {
  const { id } = useParams();
  const { dog, isLoading, error } = useDog(id);

  if (isLoading) return <Loader />;
  if (error) return toast.error('Error fetching dog profile');

  return (
    <ul className="relative grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-4 gap-y-1 rounded-lg border-2 p-2 text-sm md:grid-cols-fullProfile md:gap-x-12 md:p-4 md:text-base lg:w-3/4 lg:gap-y-1">
      <li className="col-span-2 row-span-3 place-self-center md:col-span-1 md:row-span-6">
        <img
          src={dog.image}
          alt={`${dog.name} the ${dog.breed} dog`}
          className="h-28 w-28 rounded-xl object-cover md:h-40 md:w-40"
        />
      </li>
      <li className="col-span-2 text-xl font-bold md:col-span-2 md:text-2xl">
        {capFirstLowerRest(dog.name)}
      </li>
      <li>
        <ImCross className="transition:all absolute right-4 top-4 z-50 text-sm hover:cursor-pointer hover:text-org" />
      </li>
      <li className="col-span-3 flex items-center md:col-span-1">
        <BsCircleFill
          className={`${dog.isActive ? 'text-green2' : 'text-red-600'} mr-2`}
        />
        {dog.isActive ? 'Active' : 'Inactive'}
      </li>
      <li>{dog.sex}</li>
      <li>{calculateAge(dog.dateOfBirth)}</li>
      <li>{capitalizeAllLetters(dog.postalCode)}</li>
      <li className="col-span-2">
        <Button type="primary">Follow</Button>
      </li>
      <li className="col-span-3 md:col-span-1">
        <span className="font-bold">Weight: </span>
        {dog.size}&nbsp;lb
      </li>
      <li className="col-span-2">
        <Button type="primary">Message</Button>
      </li>
      <li className="col-span-3 overflow-hidden md:col-span-1">
        <span className="font-bold">Breed: </span>
        {dog.breed}
      </li>
      <li className="col-span-5 md:col-span-1">
        <span className="font-bold">Energy Level: </span>
        {dog.energyLevel}
      </li>
      <li className="col-span-5 md:col-span-3">
        <span className="font-bold">Name of Pawrents: </span>
        {capFirstLowerRest(dog.nameOfPawrents)}
      </li>
      <li className="col-span-5 md:col-span-3">
        <span className="font-bold">Message: </span>
        {dog.message}
      </li>
    </ul>
  );
};

export default FullProfile;
