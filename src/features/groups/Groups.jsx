import GroupChatOperations from './GroupChatOperations';
import GroupChatList from './GroupChatList';
import JoinedGroupChatList from './JoinedGroupChatList';

const Groups = () => {
  return (
    <section>
      <GroupChatOperations />
      <GroupChatList />
      <JoinedGroupChatList />
    </section>
  );
};

export default Groups;
