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

export const findExistingChat = async (senderId, receiverId) => {
  try {
    // Find all chat IDs where the sender is a participant
    const { data: senderChats, error: senderError } = await supabase
      .from('chatParticipation')
      .select('chatId')
      .eq('userId', senderId);

    if (senderError) {
      console.error('Error retrieving sender chat details:', senderError);
      throw senderError;
    }

    // Extract chat IDs from the sender's participations
    const senderChatIds = senderChats.map((chat) => chat.chatId);

    // Find if the receiver is in any of the sender's chats
    const { data: sharedChats, error: sharedChatError } = await supabase
      .from('chatParticipation')
      .select('chatId, chat!inner(isPrivate)')
      .in('chatId', senderChatIds)
      .eq('userId', receiverId);

    if (sharedChatError) {
      console.error('Error retrieving shared chat details:', sharedChatError);
      throw sharedChatError;
    }

    const privateChat = sharedChats.find((chat) => chat.chat.isPrivate);
    return privateChat ? privateChat.chat : null;
  } catch (error) {
    console.error('Exception when checking for existing chat:', error);
    throw error;
  }
};

export const createChat = async ({
  senderId,
  receiverId,
  senderDogId,
  receiverDogId,
}) => {
  // Check for existing chat first
  const existingChat = await findExistingChat(senderId, receiverId);
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
        dogId: senderDogId,
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
        .insert({ chatId: data.id, userId: senderId, dogId: senderDogId }),
      supabase
        .from('chatParticipation')
        .insert({ chatId: data.id, userId: receiverId, dogId: receiverDogId }),
    ]);

    return {
      chat: data,
      participations: [participationData1, participationData2],
    };
  }

  return null;
};

export const createEditOpenChat = async (newChat, id) => {
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
      .insert([
        { chatId: data.id, userId: newChat.userId, dogId: newChat.dogId },
      ]);
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
