import { useAllChats } from '../../hooks/useChats';
import { useJoinedChats } from '../../hooks/useChatParticipations';
import Loader from '../../ui/Loader';

const JoinedGroupChatList = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2">
      <h3 className="mb-1 text-sm">My Chats</h3>
    </section>
  );
};

export default JoinedGroupChatList;
