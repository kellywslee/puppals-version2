import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFollowers,
  getFollowing,
  startFollowing,
  stopFollowing,
} from '../services/apiFollows';
import { toast } from 'react-hot-toast';

export const useFollowers = (myDogId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['followers', myDogId],
    queryFn: () => getFollowers(myDogId),
    enabled: !!myDogId,
  });
  return { followersList: data, isLoading, error };
};

export const useFollowing = (myDogId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['following', myDogId],
    queryFn: () => getFollowing(myDogId),
    enabled: !!myDogId,
  });
  const refetchFollowwingDogs = () => {
    refetch();
  };
  return { followingList: data, isLoading, error, refetchFollowwingDogs };
};

export const useFollow = (myDogId) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (dogId) => startFollowing(myDogId, dogId),
    onSuccess: () => {
      queryClient.invalidateQueries(['followers']);
      queryClient.invalidateQueries(['following']);
      toast.success('Followed!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { follow: mutate, isLoading };
};

export const useUnfollow = (myDogId) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: (dogId) => stopFollowing(myDogId, dogId),
    onSuccess: () => {
      queryClient.invalidateQueries(['followers']);
      queryClient.invalidateQueries(['following']);
      toast.success('Unfollowed!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { unfollow: mutate, isLoading };
};
