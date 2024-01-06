import CreateChat from './CreateOpenChat';
import Search from '../../ui/Search';
const OpenChatOperations = () => {
  return (
    <section className="flex w-full justify-between gap-2">
      <Search />
      <CreateChat />
    </section>
  );
};

export default OpenChatOperations;
