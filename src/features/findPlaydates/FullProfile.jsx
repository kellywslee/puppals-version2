import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Hearts } from 'react-loader-spinner';
import { useDog } from '../../hooks/useDogs';
import ProfileCard from '../../ui/ProfileCard';

const FullProfile = () => {
  const { id } = useParams();
  const { dog, isLoading, error } = useDog(id);

  if (isLoading)
    return (
      <Hearts
        color="#ffbf69"
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      />
    );
  if (error) return toast.error('Error fetching dog profile');

  return (
    <>
      <ProfileCard dog={dog} />
    </>
  );
};

export default FullProfile;
