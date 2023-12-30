/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom';
// import { Hearts } from 'react-loader-spinner';
// import { toast } from 'react-toastify';

import { calculateAge } from '../../utils/helpers';

const MiniProfile = ({ dog }) => {
  return (
    <ul className="grid-cols-profile grid w-full grid-rows-2 rounded-lg border-1 border-gray-300 p-2 text-xs">
      <li className="row-span-2 place-self-center">
        <img
          src={dog?.image}
          alt={`${dog.name} the ${dog.breed} dog`}
          className=" h-12 w-12 rounded-full object-cover"
        />
      </li>
      <li className="col-span-5">{dog?.name}</li>
      <li>{dog?.breed}</li>
      <li>{dog?.sex}</li>
      <li>{calculateAge(dog?.dateOfBirth)}</li>
      <li>{dog?.size}lb</li>
      <li>{dog?.distance}km</li>
    </ul>
  );
};

export default MiniProfile;
