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
      <ul className="flex flex-col">
        <li>
          <EditProfile />
        </li>
        <li className="w-7/12">
          <img src={myDog[0]?.image} />
        </li>
        <li>Name: {myDog[0]?.name}</li>
        <li>{myDog[0]?.breed}</li>
        <li>{myDog[0]?.sex}</li>
        <li>{myDog[0]?.age}</li>
        <li>{myDog[0]?.size}</li>
        <li>{myDog[0]?.energyLevel}</li>
        <li>{myDog[0]?.postalCode}</li>
        <li>{myDog[0]?.pawrentsName}</li>
        <li>{myDog[0]?.message}</li>
      </ul>
    </section>
  );
};

export default UserDogProfile;
