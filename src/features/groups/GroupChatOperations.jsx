import CreateChat from './CreateChat';
import Search from '../../ui/Search';
const GroupChatOperations = () => {
  return (
    <section className="flex w-full justify-between gap-2">
      <Search />
      <CreateChat />
    </section>
  );
};

export default GroupChatOperations;
