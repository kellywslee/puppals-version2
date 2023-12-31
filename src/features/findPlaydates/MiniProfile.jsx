/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { capFirstLowerRest, calculateAge } from '../../utils/helpers';

const MiniProfile = ({ dog }) => {
  return (
    <Link
      to={`/findplaydates/dogs/${dog.id}?dogLat=${dog.lat}&dogLng=${dog.lng}`}
      className="w-full"
    >
      <ul className="grid w-full grid-cols-profile grid-rows-3 rounded-lg border-1  py-2  text-xs hover:border-org">
        <li className="row-span-3 place-self-center">
          <img
            src={dog.image}
            alt={`${dog.name} the ${dog.breed} dog`}
            className=" h-12 w-12 rounded-full object-cover"
          />
        </li>
        <li className="col-span-4 text-sm font-bold">
          {capFirstLowerRest(dog.name)}
        </li>
        <li className="col-span-4"> {capFirstLowerRest(dog.breed)}</li>
        <li>{dog.sex}</li>
        <li>{calculateAge(dog?.dateOfBirth)}</li>
        <li>{dog.size} lb</li>
        <li>{dog.distance} km</li>
      </ul>
    </Link>
  );
};

export default MiniProfile;
