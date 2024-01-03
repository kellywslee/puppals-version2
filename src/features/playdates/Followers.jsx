import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import { useFollowers } from '../../hooks/useFollows';
import { calDistance } from '../../utils/helpers';
import MiniProfile from '../findPlaydates/MiniProfile';
import Loader from '../../ui/Loader';

const Followers = () => {
  const { user } = useUser();
  const { myDog, isLoadingMyDog, errorMyDog } = useMyDog(user?.id);
  const { followersList, isLoadingFollowersList, errorFollowersList } =
    useFollowers(myDog?.length ? myDog[0].id : null);

  if (isLoadingMyDog || isLoadingFollowersList) return <Loader />;
  if (errorMyDog || errorFollowersList) {
    toast.error('Error loading followers list');
    return null;
  }

  let originCoordinates = [43.64, -79.4];

  if (myDog && myDog.length > 0 && myDog[0].lat && myDog[0].lng) {
    originCoordinates = [myDog[0].lat, myDog[0].lng];
  }

  const dogswithDistance = followersList.map((followEntry) => ({
    ...followEntry.dog,
    distance: parseFloat(
      calDistance(originCoordinates, [
        followEntry.dog.lat,
        followEntry.dog.lng,
      ]),
    ).toFixed(1),
  }));

  return (
    <section className="mb-2 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-1 p-3 md:mb-0 md:flex-row md:items-center md:gap-6 md:border-none lg:gap-16">
      <div className="flex items-center justify-center gap-2 md:flex-col md:gap-0">
        <span className="text-base font-bold md:text-center md:text-lg lg:text-xl">
          {followersList.length}
        </span>
        <h2 className="text-base md:text-center md:text-lg lg:text-xl">
          Followers
        </h2>
      </div>
      <section className="flex h-72 w-full flex-col items-center gap-1 overflow-y-auto overflow-x-hidden lg:w-8/12">
        {dogswithDistance.length ? (
          dogswithDistance.map((dog) => {
            return <MiniProfile key={dog.id} dog={dog} />;
          })
        ) : (
          <p className="w-11/12 text-center text-sm">No followers yet. 🐶</p>
        )}
      </section>
    </section>
  );
};

export default Followers;
