import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getMessages,
  sendMessage,
  deleteMessage,
} from '../services/apiMessages';
import { toast } from 'react-hot-toast';

export const useMessages = (chatId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getMessages(chatId),
  });
  return { messages: data, isLoadingMessages: isLoading, errorMessages: error };
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: sendMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messages', data.chatId]);
      toast.success('Message sent!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendMessage: mutate, isSending: isLoading, errorSending: error };
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: deleteMessage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['messages', data.chatId]);
      toast.success('Message deleted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteMessage: mutate, isDeleting: isLoading, errorDeleting: error };
};
