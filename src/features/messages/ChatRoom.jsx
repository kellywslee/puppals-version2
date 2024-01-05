/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPaw } from 'react-icons/fa';
// import { useJoinedChats } from '../../hooks/useChatParticipations';
import { useChatByName } from '../../hooks/useChats';
import { useAllMessages, useSendMessage } from '../../hooks/useMessages';
import Loader from '../../ui/Loader';

const ChatRoom = ({ dogToSendMessage, user }) => {
  const [formValue, setFormValue] = useState('');
  // const { joinedChats, isLoadingJoinedChats, errorJoinedChats } =
  //   useJoinedChats(user.id);
  const { chat, isLoadingChat, errorChat } = useChatByName(
    user.id,
    dogToSendMessage.userId,
  );

  const { allMessages, isLoadingAllMessages, errorAllMessages } =
    useAllMessages(chat?.id);
  const { sendMessage, isSending, errorSending } = useSendMessage();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formValue) {
      toast.error('Please enter a message.');
      return;
    }
    sendMessage({
      content: formValue,
      senderId: user.id,
      receiverId: dogToSendMessage.userId,
    });
    setFormValue('');
  };

  if (!user?.id || !dogToSendMessage?.userId) {
    toast.error('Invalid user information.');
    return;
  }

  if (isSending || isLoadingAllMessages || isLoadingChat) return <Loader />;
  if (errorSending) {
    toast.error('Error sending message');
    return null;
  }
  if (errorAllMessages || errorChat) {
    toast.error('Error loading messages');
    return null;
  }

  return (
    <section className="relative z-50 h-60">
      <section>{allMessages}</section>
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-2 flex w-full items-center justify-between gap-1"
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Message"
          className="w-11/12 rounded-lg border-1 outline-slate-950"
        />
        <button type="submit" disabled={!formValue} aria-label="Send message">
          <FaPaw />
        </button>
      </form>
    </section>
  );
};

export default ChatRoom;
