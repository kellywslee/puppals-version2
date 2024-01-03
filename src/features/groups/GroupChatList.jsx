import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAllChats } from '../../hooks/useChats';
import GroupChatInfoCard from '../../ui/GroupChatInfoCard';
import Loader from '../../ui/Loader';

const GroupChatList = () => {
  const { chats, isLoadingAllChats, errorAllChats } = useAllChats();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  if (isLoadingAllChats) return <Loader />;
  if (errorAllChats) {
    toast.error('Error loading chats');
    return null;
  }

  const filteredChats = chats.filter((chat) => {
    // Apply search filter
    if (
      searchQuery &&
      !chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2">
      <h3 className="mb-1 text-sm">Join Now</h3>
      <div className="flex w-full flex-col gap-1">
        {filteredChats.map((chat) => (
          <GroupChatInfoCard key={chat.id} chat={chat} />
        ))}
      </div>
    </section>
  );
};

export default GroupChatList;
