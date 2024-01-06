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

export const sendMessage = async (message) => {
  let query = supabase.from('message');

  query = query.insert([{ ...message }]);

  const { data, error } = await query.select().single();

  if (error) {
    console.error('Error sending message:', error);
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
