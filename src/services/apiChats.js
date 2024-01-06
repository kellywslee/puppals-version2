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

export const findChatByName = async (user1Id, user2Id) => {
  const chatNameA = `${user1Id}${user2Id}`;
  const chatNameB = `${user2Id}${user1Id}`;

  const { data, error } = await supabase
    .from('chat')
    .select('id, name')
    .in('name', [chatNameA, chatNameB])
    .single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room not found');
  }

  return data;
};

export const checkForExistingChat = async (senderId, receiverId) => {
  try {
    const expectedChatName =
      `${senderId}${receiverId}` || `${receiverId}${senderId}`;

    // Query the chat table for a chat with the expected name and is private
    const { data: chats, error: chatError } = await supabase
      .from('chat')
      .select('id, name, isPrivate')
      .eq('name', expectedChatName)
      .eq('isPrivate', true);

    if (chatError) {
      console.error('Error retrieving chat details:', chatError);
      throw chatError;
    }

    // If a chat is found and it is private, return it
    if (chats && chats.length > 0 && chats[0].isPrivate) {
      return chats[0];
    }
    return null; // Return null if no chat is found or if it's not private
  } catch (error) {
    console.error('Exception when checking for existing chat:', error);
    throw error;
  }
};

export const createChat = async ({ senderId, receiverId }) => {
  // Check for existing chat first
  const existingChat = await checkForExistingChat(senderId, receiverId);
  let query = supabase.from('chat');

  if (existingChat) {
    return {
      chat: existingChat,
      participations: [],
    };
  }

  if (!existingChat)
    query = query.insert([
      {
        name: `${senderId}${receiverId}`,
        isPrivate: true,
        userId: senderId,
      },
    ]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room could not be created');
  }
  // Create chat participations
  if (data) {
    const [participationData1, participationData2] = await Promise.all([
      supabase
        .from('chatParticipation')
        .insert({ chatId: data.id, userId: senderId }),
      supabase
        .from('chatParticipation')
        .insert({ chatId: data.id, userId: receiverId }),
    ]);

    return {
      chat: data,
      participations: [participationData1, participationData2],
    };
  }

  return null;
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
