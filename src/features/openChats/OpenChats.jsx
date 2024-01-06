import GroupChatOperations from './OpenChatOperations';
import GroupChatList from './OpenChatList';
import JoinedGroupChatList from './JoinedOpenChatList';

const OpenChats = () => {
  return (
    <section className="flex w-full flex-col gap-2 p-2">
      <h2 className="text-center text-base md:text-start md:text-lg lg:text-xl">
        Open Chats
      </h2>
      <GroupChatOperations />
      <div className="flex flex-col gap-2 md:flex-row md:items-start">
        <GroupChatList />
        <JoinedGroupChatList />
      </div>
    </section>
  );
};

export default OpenChats;
