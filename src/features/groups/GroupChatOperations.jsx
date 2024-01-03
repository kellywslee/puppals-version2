import Button from '../../ui/Button';
import Search from '../../ui/Search';
const GroupChatOperations = () => {
  return (
    <div className="flex w-full justify-between gap-2">
      <Button type="primary">+ Create Group</Button>
      <Search />
    </div>
  );
};

export default GroupChatOperations;
