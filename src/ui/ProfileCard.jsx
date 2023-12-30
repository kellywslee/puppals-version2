/* eslint-disable react/prop-types */
import {
  capFirstLowerRest,
  capitalizeAllLetters,
  calculateAge,
} from '../utils/helpers';
import { BsCircleFill } from 'react-icons/bs';

// eslint-disable-next-line react/prop-types
const ProfileCard = ({ dog }) => {
  return (
    <ul className="lg:grid-cols-fullProfile grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-4 gap-y-2 rounded-lg border-2 p-2 text-sm md:gap-x-12 md:p-4 md:text-base lg:w-3/4 lg:gap-y-1">
      <li className="col-span-2 row-span-3 place-self-center lg:col-span-1 lg:row-span-6">
        <img
          src={dog.image}
          alt={`${dog.name} the ${dog.breed} dog`}
          className="h-28 w-28 rounded-xl object-cover md:h-40 md:w-40"
        />
      </li>
      <li className="col-span-3 text-xl font-bold md:text-2xl lg:col-span-2">
        {capFirstLowerRest(dog.name)}
      </li>
      <li className="col-span-3 flex items-center lg:col-span-1">
        <BsCircleFill
          className={`${dog.isActive ? 'text-green2' : 'text-red-600'} mr-2`}
        />
        {dog.isActive ? 'Active' : 'Inactive'}
      </li>
      <li>{dog.sex}</li>
      <li>{calculateAge(dog.dateOfBirth)}</li>
      <li>{capitalizeAllLetters(dog.postalCode)}</li>
      <li className="col-span-5 lg:col-span-1">
        <span className="font-bold">Weight: </span>
        {dog.size}&nbsp;lb
      </li>

      <li className="col-span-5 overflow-hidden lg:col-span-1">
        <span className="font-bold">Breed: </span>
        {dog.breed}
      </li>
      <li className="col-span-5 lg:col-span-1">
        <span className="font-bold">Energy Level: </span>
        {dog.energyLevel}
      </li>
      <li className="col-span-5 lg:col-span-3">
        <span className="font-bold">Name of Pawrents: </span>
        {capFirstLowerRest(dog.nameOfPawrents)}
      </li>
      <li className="col-span-5 lg:col-span-3">
        <span className="font-bold">Message: </span>
        {dog.message}
      </li>
    </ul>
  );
};

export default ProfileCard;
