import supabase from './supabase';

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

export const getChatParticipants = async (chatId) => {
  // Fetch all participations for the chat
  const { data: participationData, error: participationError } = await supabase
    .from('chatParticipation')
    .select(`userId`)
    .eq('chatId', chatId);

  if (participationError) {
    console.error(participationError);
    throw new Error('Participants could not be loaded');
  }

  // Fetch dog information for each participant
  const participantsWithDogs = await Promise.all(
    participationData.map(async (participation) => {
      const { data: dogData, error: dogError } = await supabase
        .from('dog')
        .select(`id, name, image`)
        .eq('userId', participation.userId); // Get the dog for this user

      if (dogError) {
        console.error(dogError);
        throw new Error('Could not load dog information for participant');
      }

      return {
        ...participation,
        dog: dogData[0],
      };
    }),
  );

  return participantsWithDogs;
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
