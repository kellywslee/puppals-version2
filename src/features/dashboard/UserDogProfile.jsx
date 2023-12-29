import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
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
      <ul className="grid grid-cols-4 grid-rows-7 items-center gap-x-6">
        <li className="col-span-2 row-span-3 self-center">
          <img src={myDog[0]?.image} className="rounded-xl object-cover" />
        </li>
        <li className="col-span-2 place-self-center text-xl font-bold">
          {myDog[0]?.name}
        </li>
        <li className="col-span-2">Active:</li>
        <li className="col-span-2">{myDog[0]?.breed}</li>
        <li className="col-span-2">
          <EditProfile />
        </li>
        <li>{myDog[0]?.sex}</li>
        <li>{myDog[0]?.age}</li>
        <li>{myDog[0]?.size}</li>
        <li className="col-span-4">{myDog[0]?.energyLevel}</li>
        <li className="col-span-4">{myDog[0]?.postalCode}</li>
        <li className="col-span-4">{myDog[0]?.pawrentsName}</li>
        <li>{myDog[0]?.message}</li>
      </ul>
    </section>
  );
};

export default UserDogProfile;
