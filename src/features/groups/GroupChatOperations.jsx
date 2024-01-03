import CreateChat from './CreateChat';
import Search from '../../ui/Search';
const GroupChatOperations = () => {
  return (
    <div className="flex w-full justify-between gap-2">
      <CreateChat />
      <Search />
    </div>
  );
};

export default GroupChatOperations;
