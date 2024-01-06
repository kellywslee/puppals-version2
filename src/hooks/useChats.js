import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getChats,
  getChat,
  findChatByName,
  createChat,
  createEditGroupChat,
  deleteChat,
} from '../services/apiChats';
import { toast } from 'react-hot-toast';

export const useAllChats = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => getChats(userId),
    enabled: !!userId,
  });
  return { chats: data, isLoadingAllChats: isLoading, errorAllChats: error };
};

export const useChat = (chatId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => getChat(chatId),
  });
  return { chat: data, isLoadingChat: isLoading, errorChat: error };
};

export const useChatByName = (user1Id, user2Id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['chatByName', user1Id, user2Id],
    queryFn: () => findChatByName(user1Id, user2Id),
  });
  return { chat: data, isLoadingChat: isLoading, errorChat: error };
};

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chats']);
      queryClient.invalidateQueries(['chat', data.id]);
      toast.success('Chat Room created!');
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  return { createChat: mutate, isCreating: isLoading, errorCreating: error };
};

// export const useEditChat = () => {
//   const queryClient = useQueryClient();
//   const { mutate, isLoading } = useMutation({
//     mutationFn: ({ newChatData, id }) => createEditChat(newChatData, id),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries(['chats']);
//       queryClient.invalidateQueries(['chat', data.id]);
//       toast.success('Chat Room successfully edited');
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//   });

//   return { editChat: mutate, isEditing: isLoading };
// };

export const useCreateGroupChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createEditGroupChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chats']);
      queryClient.invalidateQueries(['chat', data.id]);
      toast.success('Chat Room created!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createGroupChat: mutate, isGroupCreating: isLoading };
};

export const useEditGroupChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newChatData, id }) => createEditGroupChat(newChatData, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['chats']);
      queryClient.invalidateQueries(['chat', data.id]);
      toast.success('Chat Room successfully edited');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editGroupChat: mutate, isGroupEditing: isLoading };
};

export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: deleteChat,
    onSuccess: (data) => {
      toast.success('Chat Room successfully deleted');
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries(['chat', data.id]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteChat: mutate, isDeleting: isLoading };
};
