import DirectMessagesList from './DirectMessagesList';
import GroupChatsList from './GroupChatsList';

const PrivateChats = () => {
  return (
    <section className="flex w-full flex-col gap-2 p-2">
      <h2 className="text-center text-base md:text-lg lg:text-xl">
        Private Chats
      </h2>
      <div className="flex flex-col gap-2 md:flex-row md:items-start ">
        <DirectMessagesList />
        <GroupChatsList />
      </div>
    </section>
  );
};

export default PrivateChats;
