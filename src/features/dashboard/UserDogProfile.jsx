import { toast } from 'react-hot-toast';

import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import EditProfile from './EditProfile';
import ProfileCard from '../../ui/ProfileCard';
import Loader from '../../ui/Loader';

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
    <section className="mb-4 flex w-11/12 flex-col items-center justify-center rounded-lg border-2 p-3 lg:p-4">
      <div className="mb-2 flex w-full flex-row justify-between lg:w-3/4">
        <h2 className="mb-2 text-base md:text-lg lg:text-xl">
          My Dog&apos;s Profile
        </h2>
        <EditProfile dogToEdit={myDog[0]} />
      </div>
      <ProfileCard dog={dogData} />
    </section>
  );
};

export default UserDogProfile;
