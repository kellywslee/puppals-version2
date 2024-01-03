/* eslint-disable react/prop-types */
import Button from './Button';

const GroupChatInfoCard = ({ chat }) => {
  return (
    <ul className="grid-cols-chat grid w-full rounded-lg border-1 p-2 text-sm transition-all hover:border-org">
      <li className="font-bold">{chat.name}</li>
      <li className="row-span-2 flex items-center">
        <Button type="primary">Join</Button>
      </li>
      <li>10 members</li>
    </ul>
  );
};

export default GroupChatInfoCard;
