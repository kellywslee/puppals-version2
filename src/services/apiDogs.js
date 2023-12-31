import supabase, { supabaseUrl } from './supabase';

export const getDogs = async () => {
  const { data, error } = await supabase.from('dog').select('*');

  if (error) {
    console.error(error);
    throw new Error('Dogs could not be loaded');
  }

  return data;
};

export const getDog = async (id) => {
  const { data, error } = await supabase
    .from('dog')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Dog not found');
  }

  return data;
};

export const getCurrentUsersDog = async (userId) => {
  const { data, error } = await supabase
    .from('dog')
    .select('*')
    .eq('userId', userId);

  if (error) {
    console.error(error);
    throw new Error('Dog could not be loaded');
  }

  return data;
};

export const createEditDog = async (newDog, id) => {
  const hasImagePath = newDog.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newDog.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath
    ? newDog.image
    : `${supabaseUrl}/storage/v1/object/public/dogImage/${imageName}`;

  let query = supabase.from('dog');

  if (!id)
    query = query.insert([
      {
        ...newDog,
        image: imagePath,
        location: `POINT(${newDog.location.lng} ${newDog.location.lat})`,
        lat: newDog.location.lat,
        lng: newDog.location.lng,
      },
    ]);
  if (id)
    query = query
      .update({
        ...newDog,
        image: imagePath,
        location: `POINT(${newDog.location.lng} ${newDog.location.lat})`,
        lat: newDog.location.lat,
        lng: newDog.location.lng,
      })
      .eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Dog could not be created');
  }
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from('dogImage')
    .upload(imageName, newDog.image);

  if (storageError) {
    await supabase.from('dog').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Dog image could not be uploaded and the dog was not created',
    );
  }
  return data;
};
