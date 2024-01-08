import OpenChatOperations from './OpenChatOperations';
import OpenChatList from './OpenChatList';
import JoinedOpenChatList from './JoinedOpenChatList';

const OpenChats = () => {
  return (
    <section className="flex w-full flex-col gap-2 p-2">
      <h2 className="text-center text-base md:text-lg lg:text-xl">
        Open Chats
      </h2>
      <OpenChatOperations />
      <div className="flex flex-col gap-2 md:flex-row md:items-start ">
        <OpenChatList />
        <JoinedOpenChatList />
      </div>
    </section>
  );
};

export default OpenChats;
