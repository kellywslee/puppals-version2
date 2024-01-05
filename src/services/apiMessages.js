import supabase from './supabase';
import { createEditChat } from './apiChats';
import { joinChat } from './apiChatParticipations';

export const getMessages = async (chatId) => {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('chatId', chatId)
    .order('insertedAt', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Messages could not be loaded');
  }

  return data;
};

export const checkForExistingChat = async (senderId, receiverId) => {
  try {
    // First, find all chats that the sender is part of.
    const { data: senderChats, error: senderError } = await supabase
      .from('chatParticipation')
      .select('chatId')
      .eq('userId', senderId);

    if (senderError) {
      console.error('Error finding sender chats:', senderError);
      throw senderError;
    }

    // Then, find all chats that the receiver is part of.
    const { data: receiverChats, error: receiverError } = await supabase
      .from('chatParticipation')
      .select('chatId')
      .eq('userId', receiverId);

    if (receiverError) {
      console.error('Error finding receiver chats:', receiverError);
      throw receiverError;
    }

    // Find common chatIds between sender and receiver
    const commonChats = senderChats.filter(({ chatId }) =>
      receiverChats.some((c) => c.chatId === chatId),
    );

    // If there's a common chat, fetch its details
    if (commonChats.length > 0) {
      const { data: chat, error: chatError } = await supabase
        .from('chat')
        .select('id, name, isPrivate')
        .eq('id', commonChats[0].chatId)
        .single();

      if (chatError) {
        console.error('Error retrieving chat details:', chatError);
        throw chatError;
      }

      return chat;
    }

    return null;
  } catch (error) {
    console.error('Exception when checking for existing chat:', error);
    throw error;
  }
};

export const sendMessage = async (messageDetails) => {
  let chat = await checkForExistingChat(
    messageDetails.senderId,
    messageDetails.receiverId,
  );

  if (!chat) {
    // Create a new chat room if it doesn't exist
    chat = await createEditChat({
      name: '1:1 Chat',
      isPrivate: true,
    });

    // Create chat participations for both dogs
    await joinChat({ userId: messageDetails.senderId, chatId: chat.id });
    await joinChat({ userId: messageDetails.receiverId, chatId: chat.id });
  }

  // Send the message to the chat room
  const message = {
    content: messageDetails.content,
    chatId: chat.id,
    userId: messageDetails.senderId,
  };

  const { data, error } = await supabase.from('message').insert([message]);

  if (error) {
    console.error(error);
    throw new Error('Message could not be sent');
  }

  return data;
};

export const deleteMessage = async (id) => {
  const { data, error } = await supabase.from('message').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Message could not be deleted');
  }

  return data;
};
