import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDog } from '../../hooks/useDogs';
import ProfileCard from '../../ui/ProfileCard';
import Loader from '../../ui/Loader';

const FullProfile = () => {
  const { id } = useParams();
  const { dog, isLoading, error } = useDog(id);

  if (isLoading) return <Loader />;
  if (error) return toast.error('Error fetching dog profile');

  return (
    <>
      <ProfileCard dog={dog} />
    </>
  );
};

export default FullProfile;
