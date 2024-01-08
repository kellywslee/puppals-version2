import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import EditProfile from './EditProfile';
import UserDogProfile from './UserDogProfile';
import Setting from './Setting';
import Loader from '../../ui/Loader';

const Profile = () => {
  const { user, isLoadingUser } = useUser();
  const { myDog, isLoading, error } = useMyDog(user?.id);

  if (!user || !myDog || isLoading || isLoadingUser) return <Loader />;
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

  const dogData = myDog?.[0] || defaultDogData;

  return (
    <section className="flex w-full flex-col gap-2 p-2">
      <h2 className="text-center text-base md:text-lg lg:text-xl">
        My Dog&apos;s Profile
      </h2>
      <EditProfile dogToEdit={myDog?.[0]} />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:items-start ">
        <UserDogProfile dogData={dogData} />
        <Setting />
      </div>
    </section>
  );
};

export default Profile;
