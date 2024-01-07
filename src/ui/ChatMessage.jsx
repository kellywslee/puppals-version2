/* eslint-disable react/prop-types */
const ChatMessage = ({ message }) => {
  return (
    <ul className="flex items-center gap-2">
      <li className="h-6 w-6">
        <img src={message.dog.image} className="h-6 w-6 rounded-full" />
      </li>
      <li>{message.dog.name}</li>
      <li className="rounded-lg border-1 p-2">{message.content}</li>
    </ul>
  );
};

export default ChatMessage;
