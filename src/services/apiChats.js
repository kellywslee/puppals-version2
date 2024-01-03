import supabase from './supabase';

export const getChats = async () => {
  const { data, error } = await supabase.from('chat').select('*');

  if (error) {
    console.error(error);
    throw new Error('Chat Rooms could not be loaded');
  }

  return data;
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

  console.log(newChat);

  if (!id) query = query.insert([{ ...newChat }]);
  if (id) query = query.update({ ...newChat }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Chat Room could not be created');
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
