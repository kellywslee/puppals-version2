/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPaw } from 'react-icons/fa';
import { useMyDog } from '../../hooks/useDogs';
import { useChatByName } from '../../hooks/useChats';
import { useSendMessage, useAllMessages } from '../../hooks/useMessages';
import ChatMessage from './ChatMessage';
import Loader from '../../ui/Loader';

const ChatRoom = ({ dogToSendMessage, user }) => {
  const [formValue, setFormValue] = useState('');
  const { chat, isLoadingChat, errorChat } = useChatByName(
    user.id,
    dogToSendMessage.userId,
  );
  const { myDog, isLoadingMyDog, errorMyDog } = useMyDog(user?.id);
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
      userId: user.id,
      chatId: chat?.id,
      dogId: myDog?.[0]?.id,
    });
    setFormValue('');
  };

  if (!user?.id || !dogToSendMessage?.userId) {
    toast.error('Invalid user information.');
    return;
  }

  if (isLoadingMyDog || isSending || isLoadingChat || isLoadingAllMessages)
    return <Loader />;

  if (errorMyDog) {
    toast.error('Error loading your dog');
    return null;
  }
  if (errorSending) {
    toast.error('Error sending message');
    return null;
  }
  if (errorChat || errorAllMessages) {
    toast.error('Error loading messages');
    return null;
  }

  return (
    <section className="relative z-50 h-60">
      <section className="flex h-48 flex-col gap-2 overflow-auto">
        {allMessages &&
          allMessages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </section>
      <form
        onSubmit={handleSendMessage}
        className="absolute bottom-2 flex w-full items-center justify-between gap-1"
      >
        <input
          value={formValue}
          disabled={true}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Message"
          className="w-11/12 rounded-lg border-1 p-2 outline-slate-950"
        />
        <button type="submit" disabled={!formValue} aria-label="Send message">
          <FaPaw />
        </button>
      </form>
    </section>
  );
};

export default ChatRoom;
