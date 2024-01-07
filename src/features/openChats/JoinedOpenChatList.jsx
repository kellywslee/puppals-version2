import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useJoinedChats } from '../../hooks/useChatParticipations';
import JoinedOpenChatInfoCard from './JoinedOpenChatInfoCard';
import Loader from '../../ui/Loader';

const JoinedOpenChatList = () => {
  const { user } = useUser();
  const { joinedChats, isLoadingJoinedChats, errorJoinedChats } =
    useJoinedChats(user.id);

  if (isLoadingJoinedChats) return <Loader />;
  if (errorJoinedChats) {
    toast.error('Error loading data');
    return null;
  }

  const publicChats = joinedChats.filter(
    (item) => item.chat.isPrivate === false,
  );

  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2 ">
      <h3 className="mb-1 text-sm">My Joined Chats</h3>
      <div className="flex w-full flex-col gap-1 md:max-h-64 md:overflow-y-auto">
        {publicChats.map((item) => (
          <JoinedOpenChatInfoCard key={item.chat.id} chat={item.chat} />
        ))}
      </div>
    </section>
  );
};

export default JoinedOpenChatList;
