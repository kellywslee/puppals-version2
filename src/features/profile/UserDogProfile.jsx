/* eslint-disable react/prop-types */
import { BsCircleFill } from 'react-icons/bs';
import {
  capFirstLowerRest,
  capitalizeAllLetters,
  calculateAge,
} from '../../utils/helpers';

const UserDogProfile = ({ dogData }) => {
  return (
    <ul className="grid w-full grid-cols-[auto] grid-rows-[auto] items-center gap-x-1 gap-y-1 rounded-lg border-1 p-2 text-xs md:p-4 lg:text-sm">
      <li className="col-span-1 row-span-4 h-24 w-24 place-self-start">
        <img
          src={dogData.image}
          alt={`${dogData.name} the ${dogData.breed} dog`}
          className="h-full w-full rounded-xl object-cover"
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
      <li className="col-span-3">{capitalizeAllLetters(dogData.postalCode)}</li>
      <li className="col-span-3 ">
        <span className="font-bold">Energy Level: </span>
        {dogData.energyLevel}
      </li>
      <li className="col-span-4 overflow-hidden ">
        <span className="font-bold">Breed: </span>
        {capFirstLowerRest(dogData.breed)}
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
  );
};

export default UserDogProfile;
