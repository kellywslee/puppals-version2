import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  capFirstLowerRest,
  capitalizeAllLetters,
  calculateAge,
} from '../../utils/helpers';
import { ImCross } from 'react-icons/im';
import { BsCircleFill } from 'react-icons/bs';
import { useDog } from '../../hooks/useDogs';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';

const FullProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dog, isLoading, error } = useDog(id);

  if (isLoading) return <Loader />;
  if (error) return toast.error('Error fetching dog profile');

  return (
    <article className="flex items-center justify-center md:mt-2 lg:mt-0 lg:w-1/2">
      <ul className="relative grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-4 gap-y-1 rounded-lg border-2 p-2 text-sm md:w-2/3 lg:h-full lg:w-full">
        <li className="col-span-2 row-span-3 place-self-center ">
          <img
            src={dog.image}
            alt={`${dog.name} the ${dog.breed} dog`}
            className="h-28 w-28 rounded-xl object-cover"
          />
        </li>
        <li className="col-span-2 text-xl font-bold">
          {capFirstLowerRest(dog.name)}
        </li>
        <li>
          <ImCross
            className="transition:all absolute right-4 top-4 z-50 text-sm hover:cursor-pointer hover:text-org"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          />
        </li>
        <li className="col-span-3 flex items-center">
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
        <li className="col-span-3">
          <span className="font-bold">Weight: </span>
          {dog.size}&nbsp;lb
        </li>
        <li className="col-span-2">
          <Button type="primary">Message</Button>
        </li>
        <li className="col-span-3 overflow-hidden">
          <span className="font-bold">Breed: </span>
          {dog.breed}
        </li>
        <li className="col-span-5">
          <span className="font-bold">Energy Level: </span>
          {dog.energyLevel}
        </li>
        <li className="col-span-5">
          <span className="font-bold">Name of Pawrents: </span>
          {capFirstLowerRest(dog.nameOfPawrents)}
        </li>
        <li className="col-span-5">
          <span className="font-bold">Message: </span>
          {dog.message}
        </li>
      </ul>
    </article>
  );
};

export default FullProfile;
