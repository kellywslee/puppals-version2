import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, deleteMessage } from '../services/apiMessages';
import { toast } from 'react-hot-toast';

export const useAllMessages = (chatId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['messages', chatId],
    queryFn: () => getMessages(chatId),
    enabled: !!chatId,
  });
  return {
    allMessages: data,
    isLoadingMessages: isLoading,
    errorMessages: error,
  };
};

// export const useSendMessage = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading, error } = useMutation({
//     mutationFn: sendMessage,
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['messages', data.chatId]);
//       toast.success('Message sent!');
//     },
//     onError: (err) => {
//       console.error('Error when sending message:', err);
//       toast.error(err.message || 'Error sending message');
//     },
//   });

//   return { sendMessage: mutate, isSending: isLoading, errorSending: error };
// };

// export const useSendMessage = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading, error } = useMutation({
//     mutationFn: sendMessage,
//     onSuccess: (data) => {
//       if (data && data.chatId) {
//         queryClient.invalidateQueries(['messages', data.chatId]);
//         toast.success('Message sent!');
//       } else {
//         console.error('Invalid data received:', data);
//       }
//     },
//     onError: (err) => {
//       console.error('Error when sending message:', err);
//       toast.error(err.message || 'Error sending message');
//     },
//   });

//   return { sendMessage: mutate, isSending: isLoading, errorSending: error };
// };

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
