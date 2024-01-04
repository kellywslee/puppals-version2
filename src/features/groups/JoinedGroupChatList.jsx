import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useJoinedChats } from '../../hooks/useChatParticipations';
import GroupChatInfoCard from '../../ui/GroupChatInfoCard';
import Loader from '../../ui/Loader';

const JoinedGroupChatList = () => {
  const { user } = useUser();
  const { joinedChats, isLoadingJoinedChats, errorJoinedChats } =
    useJoinedChats(user.id);

  if (isLoadingJoinedChats) return <Loader />;
  if (errorJoinedChats) {
    toast.error('Error loading data');
    return null;
  }

  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2">
      <h3 className="mb-1 text-sm">My Chats</h3>
      <div className="flex w-full flex-col gap-1">
        {joinedChats.map((item) => (
          <GroupChatInfoCard
            key={item.chat.id}
            chat={item.chat}
            isJoined={true}
          />
        ))}
      </div>
    </section>
  );
};

export default JoinedGroupChatList;
