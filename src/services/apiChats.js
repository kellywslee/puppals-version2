import supabase from './supabase';

export const getChats = async (userId) => {
  // Get all chat IDs that the user has joined
  const { data: joinedChatIdsData, error: joinedChatIdsError } = await supabase
    .from('chatParticipation')
    .select('chatId')
    .eq('userId', userId);

  if (joinedChatIdsError) {
    console.error(joinedChatIdsError);
    throw new Error('Could not load joined chat IDs');
  }

  const joinedChatIds = joinedChatIdsData.map((cp) => cp.chatId);

  // Get all chats where isPrivate is false
  const { data: allChatsData, error: allChatsError } = await supabase
    .from('chat')
    .select('*')
    .eq('isPrivate', false);

  if (allChatsError) {
    console.error(allChatsError);
    throw new Error('Chat Rooms could not be loaded');
  }

  // Filter out chats that the user has joined
  const chatsToDisplay = allChatsData.filter(
    (chat) => !joinedChatIds.includes(chat.id),
  );

  return chatsToDisplay;
};

export const getChat = async (id) => {
  const { data, error } = await supabase
    .from('chat')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room not found');
  }

  return data;
};

export const createEditChat = async (newChat, id) => {
  let query = supabase.from('chat');

  if (!id) query = query.insert([{ ...newChat }]);
  if (id) query = query.update({ ...newChat }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room could not be created');
  }

  if (data) {
    const participationData = await supabase
      .from('chatParticipation')
      .insert([{ chatId: data.id, userId: newChat.userId }]);
    return participationData;
  }

  return data;
};

export const createEditGroupChat = async (newChat, id) => {
  let query = supabase.from('chat');

  if (!id) query = query.insert([{ ...newChat }]);
  if (id) query = query.update({ ...newChat }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room could not be created');
  }

  if (data) {
    const participationData = await supabase
      .from('chatParticipation')
      .insert([{ chatId: data.id, userId: newChat.userId }]);
    return participationData;
  }

  return data;
};

export const deleteChat = async (id) => {
  const { data, error } = await supabase.from('chat').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Chat Room could not be deleted');
  }

  return data;
};
