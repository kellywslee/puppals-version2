/* eslint-disable react/prop-types */
import { toast } from 'react-hot-toast';
import { useChatParticipants } from '../hooks/useChatParticipations';
import Loader from './Loader';
import Button from './Button';

const GroupChatInfoCard = ({ chat, isJoined }) => {
  const { chatParticipants, isLoadingChatParticipants, errorChatParticipants } =
    useChatParticipants(chat.id);

  if (isLoadingChatParticipants) return <Loader />;
  if (errorChatParticipants) {
    toast.error('Error loading chat participants');
    return null;
  }

  console.log(chatParticipants);
  return (
    <ul className="grid w-full grid-cols-chat rounded-lg border-1 p-2 text-sm transition-all hover:border-org">
      <li className="font-bold">{chat.name}</li>
      <li className="row-span-2 flex items-center">
        <Button type="primary">{isJoined ? 'Chat' : 'Join'}</Button>
      </li>
      <li>
        {chatParticipants.length}{' '}
        {chatParticipants.length <= 1 ? 'member' : ' members'}
      </li>
    </ul>
  );
};

export default GroupChatInfoCard;
