import supabase from './supabase';

// export const getJoinedChats = async (userId) => {
//   const { data, error } = await supabase
//     .from('chatParticipation')
//     .select('chatId')
//     .eq('userId', userId);

//   if (error) {
//     console.error(error);
//     throw new Error('Chat Rooms could not be loaded');
//   }

//   return data;
// };
export const getJoinedChats = async (userId) => {
  const { data, error } = await supabase
    .from('chatParticipation')
    .select(`chatId, userId, chat(id, name)`)
    .eq('userId', userId);

  if (error) {
    console.error(error);
    throw new Error('Chat Rooms could not be loaded');
  }

  return data;
};

export const joinChat = async (userId, chatId) => {
  const { data, error } = await supabase
    .from('chatParticipation')
    .insert([{ userId, chatId }]);

  if (error) {
    console.error(error);
    throw new Error('You could not join this Chat Room');
  }

  return data;
};

export const leaveChat = async (userId, chatId) => {
  const { data, error } = await supabase
    .from('chatParticipation')
    .delete()
    .eq('userId', userId)
    .eq('chatId', chatId);

  if (error) {
    console.error(error);
    throw new Error('You could not leave this Chat Room');
  }

  return data;
};
