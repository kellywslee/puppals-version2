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

export const sendMessage = async (messageDetails) => {
  const message = {
    content: messageDetails.content,
    chatId: messageDetails.chatId,
    userId: messageDetails.userId,
  };

  const { data, error } = await supabase.from('message').insert([message]);

  if (error) {
    console.error('Error sending message:', error);
    throw new Error('Message could not be sent');
  }

  return data;
};

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
