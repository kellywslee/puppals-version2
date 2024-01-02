import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import { useFollowing } from '../../hooks/useFollows';
import { calDistance } from '../../utils/helpers';
import MiniProfile from '../findPlaydates/MiniProfile';
import Loader from '../../ui/Loader';

const Following = () => {
  const { user } = useUser();
  const { myDog, isLoadingMyDog, errorMyDog } = useMyDog(user?.id);
  const { followingList, isLoadingFollowingList, errorFollowingList } =
    useFollowing(myDog?.length ? myDog[0].id : null);

  if (isLoadingMyDog || isLoadingFollowingList) return <Loader />;
  if (errorMyDog || errorFollowingList) {
    toast.error('Error loading following list');
    return null;
  }

  let originCoordinates = [43.64, -79.4];

  if (myDog && myDog.length > 0 && myDog[0].lat && myDog[0].lng) {
    originCoordinates = [myDog[0].lat, myDog[0].lng];
  }

  const dogswithDistance = followingList.map((followEntry) => ({
    ...followEntry.dog,
    distance: parseFloat(
      calDistance(originCoordinates, [
        followEntry.dog.lat,
        followEntry.dog.lng,
      ]),
    ).toFixed(1),
  }));

  return (
    <section className="mb-2 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-1 p-3 md:mb-0 md:flex-row md:items-center md:border-none lg:gap-6">
      <h2 className="text-base md:text-center md:text-lg lg:text-xl">
        Following
      </h2>
      <section className="flex h-72 flex-col gap-1 overflow-y-auto overflow-x-hidden">
        {dogswithDistance.length ? (
          dogswithDistance.map((dog) => {
            return <MiniProfile key={dog.id} dog={dog} />;
          })
        ) : (
          <p className="w-11/12 text-center text-sm">
            You are not following any dogs yet.
            <Link to="/findplaydates/dogs"> Start Searching!</Link>
          </p>
        )}
      </section>
    </section>
  );
};

export default Following;
