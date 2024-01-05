/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { useChatParticipantsCount } from '../../hooks/useChatParticipations';
import Button from '../../ui/Button';
import Loader from '../../ui/Loader';

const JoinedGroupChatInfoCard = ({ chat }) => {
  const {
    chatParticipantsCount,
    isLoadingChatParticipantsCount,
    errorChatParticipantsCount,
  } = useChatParticipantsCount(chat?.id);

  if (isLoadingChatParticipantsCount) return <Loader />;
  if (errorChatParticipantsCount) {
    toast.error('Error loading chat participants count');
    return null;
  }

  return (
    <ul className="grid w-full grid-cols-chat rounded-lg border-1 p-2 text-sm transition-all hover:border-org">
      <li className="font-bold">{chat.name}</li>
      <li className="row-span-2 flex items-center">
        <Button type="primary">Chat</Button>
      </li>
      <li>
        {' '}
        {chatParticipantsCount}{' '}
        {chatParticipantsCount <= 1 ? 'member' : ' members'}
      </li>
    </ul>
  );
};

export default JoinedGroupChatInfoCard;
