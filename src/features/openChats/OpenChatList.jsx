import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useUser } from '../../hooks/useAuth';
import { useAllChats } from '../../hooks/useChats';
import OpenChatInfoCard from './OpenChatInfoCard';
import Loader from '../../ui/Loader';

const OpenChatList = () => {
  const { user } = useUser();
  const { chats, isLoadingAllChats, errorAllChats } = useAllChats(user.id);

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
          <OpenChatInfoCard key={chat.id} chat={chat} user={user} />
        ))}
      </div>
    </section>
  );
};

export default OpenChatList;
