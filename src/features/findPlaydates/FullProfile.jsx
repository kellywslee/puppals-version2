import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useDog, useMyDog } from '../../hooks/useDogs';
import { useFollow, useUnfollow, useFollowing } from '../../hooks/useFollows';
import { useCreateChat } from '../../hooks/useChats';
import { capFirstLowerRest, calculateAge } from '../../utils/helpers';
import { ImCross } from 'react-icons/im';
import { BsCircleFill } from 'react-icons/bs';
import { calDistance } from '../../utils/helpers';
import SendMessage from '../privateChats/SendMessage';
import Loader from '../../ui/Loader';
import Button from '../../ui/Button';

const FullProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dog, isLoadingDog, errorDog } = useDog(id);
  const { user, isAuthenticated } = useUser();
  const { myDog, isLoadingMyDog, errorMyDog } = useMyDog(user?.id);
  const { followingList, isLoadingFollowingList } = useFollowing(
    myDog?.[0]?.id,
  );
  const { follow, isLoading: isWorking } = useFollow(myDog?.[0]?.id);
  const { unfollow, isLaoding: isUnfollowing } = useUnfollow(myDog?.[0]?.id);
  const { createChat, isCreating, errorCreating } = useCreateChat(
    user?.id,
    dog?.id,
  );

  const [searchParams] = useSearchParams();

  if (
    isLoadingDog ||
    (user &&
      isLoadingMyDog &&
      isWorking &&
      isLoadingFollowingList &&
      isUnfollowing &&
      isCreating)
  )
    return <Loader />;
  if (errorDog || (user && errorMyDog && errorCreating) || !dog) {
    toast.error('Error loading dogs');
    return null;
  }

  const userLat = searchParams.get('lat');
  const userLng = searchParams.get('lng');
  let originCoordinates = [43.64, -79.4];

  if (userLat && userLng) {
    originCoordinates = [parseFloat(userLat), parseFloat(userLng)];
  } else if (myDog && myDog.length > 0 && myDog[0].lat && myDog[0].lng) {
    originCoordinates = [myDog[0].lat, myDog[0].lng];
  }

  const dogWithDistance = {
    ...dog,
    distance: parseFloat(
      calDistance(originCoordinates, [dog.lat, dog.lng]),
    ).toFixed(1),
  };

  const isFollowing = (dogId) =>
    followingList?.some((followedDog) => followedDog?.followingDogId === dogId);

  const toggleFollow = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to follow');
      navigate('/login');
      return;
    }
    if (isFollowing(dog.id)) {
      unfollow(dog.id);
    } else {
      follow({
        myDogId: myDog?.[0]?.id,
        dogId: dog.id,
        userId: user.id,
      });
    }
  };

  const handleCreateChat = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to send message');
      navigate('/login');
      return;
    }
    if (!user?.id || !dog?.userId) {
      toast.error('Invalid user information.');
      return;
    }
    createChat({
      senderId: user.id,
      receiverId: dog.userId,
    });
  };

  return (
    <article className="flex items-center justify-center md:mt-2 lg:mt-0 lg:w-1/2">
      <ul className="relative grid grid-cols-[auto] grid-rows-[auto] items-center gap-x-4 gap-y-1 rounded-lg border-1 p-2 text-sm md:w-2/3 lg:h-full lg:w-full lg:p-8">
        <li className="col-span-1 row-span-3 flex justify-start">
          <img
            src={dog.image}
            alt={`${dog.name} the ${dog.breed} dog`}
            className="h-28 w-28 rounded-xl object-cover"
          />
        </li>
        <li className="col-span-2 text-xl font-bold">
          {capFirstLowerRest(dog.name)}
        </li>
        <li>
          <ImCross
            className="transition:all absolute right-4 top-4 z-40 text-sm hover:cursor-pointer hover:text-org"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            aria-label="Close profile view"
          />
        </li>
        <li className="col-span-3 flex items-center">
          <BsCircleFill
            className={`${dog.isActive ? 'text-green2' : 'text-red-600'} mr-2`}
          />
          {dog.isActive ? 'Active' : 'Inactive'}
        </li>
        <li>{dog.sex}</li>
        <li>{calculateAge(dog.dateOfBirth)}</li>
        <li>{dogWithDistance.distance} km</li>
        <li
          className="col-span-1 flex justify-start"
          onClick={(e) => toggleFollow(e)}
        >
          <Button type="primary">
            {isFollowing(dog.id) ? 'Unfollow' : 'Follow'}
          </Button>
        </li>
        <li className="col-span-3">
          <span className="font-bold">Weight: </span>
          {dog.size}&nbsp;lb
        </li>
        <li className="col-span-1 flex justify-start">
          <SendMessage
            dogToSendMessage={dog}
            user={user}
            onClick={handleCreateChat}
          />
        </li>
        <li className="col-span-3 overflow-hidden">
          <span className="font-bold">Breed: </span>
          {capFirstLowerRest(dog.breed)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Energy Level: </span>
          {dog.energyLevel}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Name of Pawrents: </span>
          {capFirstLowerRest(dog.nameOfPawrents)}
        </li>
        <li className="col-span-4">
          <span className="font-bold">Message: </span>
          {dog.message}
        </li>
      </ul>
    </article>
  );
};

export default FullProfile;
