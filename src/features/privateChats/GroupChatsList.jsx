const GroupChatsList = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2 ">
      <h3 className="mb-1 text-sm">Group Chats</h3>
      {/* <div className="flex w-full flex-col gap-1 md:max-h-64 md:overflow-y-auto">
        {publicChats.map((item) => (
          <JoinedOpenChatInfoCard key={item.chat.id} chat={item.chat} />
        ))}
      </div> */}
    </section>
  );
};

export default GroupChatsList;
