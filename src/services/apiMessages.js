import supabase from './supabase';
// import { createEditChat } from './apiChats';
// import { joinChat } from './apiChatParticipations';

export const getMessages = async (chatId) => {
  const { data, error } = await supabase
    .from('message')
    .select('*')
    .eq('chatId', chatId)
    .order('createdAt', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Messages could not be loaded');
  }

  return data;
};

// export const checkForExistingChat = async (senderId, receiverId) => {
//   try {
//     const expectedChatName =
//       `${senderId}${receiverId}` || `${receiverId}${senderId}`;

//     // Query the chat table for a chat with the expected name and is private
//     const { data: chats, error: chatError } = await supabase
//       .from('chat')
//       .select('id, name, isPrivate')
//       .eq('name', expectedChatName)
//       .eq('isPrivate', true);

//     if (chatError) {
//       console.error('Error retrieving chat details:', chatError);
//       throw chatError;
//     }

//     // If a chat is found and it is private, return it
//     if (chats && chats.length > 0 && chats[0].isPrivate) {
//       return chats[0];
//     }
//     return null; // Return null if no chat is found or if it's not private
//   } catch (error) {
//     console.error('Exception when checking for existing chat:', error);
//     throw error;
//   }
// };

// export const sendMessage = async (messageDetails) => {
//   let chat = await checkForExistingChat(
//     messageDetails.senderId,
//     messageDetails.receiverId,
//   );

//   if (!chat) {
//     // Create a new chat room if it doesn't exist
//     chat = await createEditChat({
//       name: `${messageDetails.senderId}${messageDetails.receiverId}`,
//       isPrivate: true,
//       userId: messageDetails.senderId,
//     });

//     // Create chat participations for both dogs
//     await joinChat({ userId: messageDetails.senderId, chatId: chat.id });
//     await joinChat({ userId: messageDetails.receiverId, chatId: chat.id });
//   }

//   // Send the message to the chat room
//   const message = {
//     content: messageDetails.content,
//     chatId: chat.id,
//     userId: messageDetails.senderId,
//   };

//   const { data: messageData, error } = await supabase
//     .from('message')
//     .insert([message]);

//   if (error) {
//     console.error('Error sending message:', error);
//     throw new Error('Message could not be sent');
//   }

//   return messageData;
// };

export const deleteMessage = async (id) => {
  const { data, error } = await supabase.from('message').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Message could not be deleted');
  }

  return data;
};
