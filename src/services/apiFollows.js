import supabase from './supabase';

export const getFollowers = async (myDogId) => {
  const { data, error } = await supabase
    .from('follow')
    .select('followerDogId')
    .eq('followingDogId', myDogId);

  if (error) {
    console.error(error);
    throw new Error('Followers could not be loaded');
  }

  return data;
};

export const getFollowing = async (myDogId) => {
  const { data, error } = await supabase
    .from('follow')
    .select('followingDogId')
    .eq('followerDogId', myDogId);

  if (error) {
    console.error(error);
    throw new Error('Following could not be loaded');
  }

  return data;
};

export const startFollowing = async ({ myDogId, dogId, userId }) => {
  const { data, error } = await supabase.from('follow').insert([
    {
      followerDogId: myDogId,
      followingDogId: dogId,
      userId: userId,
    },
  ]);

  if (error) {
    console.error(error);
    throw new Error('Could not follow dog');
  }

  return data;
};

export const stopFollowing = async (myDogId, dogId) => {
  const { data, error } = await supabase
    .from('follow')
    .delete()
    .eq('followerDogId', myDogId)
    .eq('followingDogId', dogId);

  if (error) {
    console.error(error);
    throw new Error('Could not unfollow dog');
  }

  return data;
};
