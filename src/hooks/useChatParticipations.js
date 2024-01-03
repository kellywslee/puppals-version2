import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getJoinedChats,
  joinChat,
  leaveChat,
} from '../services/apiChatParticipations';
import { toast } from 'react-hot-toast';

export const useJoinedChats = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['joinedChats', userId],
    queryFn: () => getJoinedChats(userId),
  });
  return {
    joinedChats: data,
    isLoadingJoinedChats: isLoading,
    errorJoinedChats: error,
  };
};

export const useJoinChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: joinChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['joinedChats', data.userId]);
      toast.success('Chat Room joined!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { joinChat: mutate, isJoining: isLoading };
};

export const useLeaveChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: leaveChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['joinedChats', data.userId]);
      toast.success('Chat Room left!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { leaveChat: mutate, isLeaving: isLoading };
};
