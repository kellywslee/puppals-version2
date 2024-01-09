/* eslint-disable react/prop-types */
const DirectMessageCard = ({ chat }) => {
  return (
    <ul className="grid w-full grid-cols-chat rounded-lg border-1  p-2 text-sm transition-all hover:border-org">
      {/* <li>{chatParticipants.name}</li> */}
      <li className="font-bold">{chat.name}</li>
      <li className="row-span-2 flex items-center">join</li>
    </ul>
  );
};

export default DirectMessageCard;
