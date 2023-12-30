// import { useParams } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import { Hearts } from 'react-loader-spinner';
// import { useUser } from '../../hooks/useAuth';
// import { useMyDog } from '../../hooks/useDogs';
// import { calculateAge, calDistance } from '../../utils/helpers';

const FullProfile = () => {
  // const { user } = useUser();
  // const { myDog, isLoading, error } = useMyDog(user?.id);

  // if (!user || isLoading)
  //   return (
  //     <Hearts
  //       color="#ffbf69"
  //       wrapperStyle={{
  //         display: 'flex',
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         height: '100dvh',
  //       }}
  //     />
  //   );
  // if (error) return toast.error('Error fetching dog profile');

  // const distance = parseFloat(
  //   calDistance([myDog[0]?.lat, myDog[0]?.lng], [dog?.lat, dog?.lng]),
  // ).toFixed(1);

  return <div>FullProfile</div>;
};

export default FullProfile;
