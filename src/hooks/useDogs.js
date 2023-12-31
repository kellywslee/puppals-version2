import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCurrentUsersDog,
  getDogs,
  getDog,
  createEditDog,
} from '../services/apiDogs';
import { toast } from 'react-hot-toast';

export const useMyDog = (userId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myDog', userId],
    queryFn: () => getCurrentUsersDog(userId),
  });
  return { myDog: data, isLoadingMyDog: isLoading, errorMyDog: error };
};

export const useAllDogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dogs'],
    queryFn: () => getDogs(),
  });
  return { dogs: data, isLoadingAllDogs: isLoading, errorAllDogs: error };
};

export const useDog = (dogId) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dog', dogId],
    queryFn: () => getDog(dogId),
  });
  return { dog: data, isLoadingDog: isLoading, errorDog: error };
};

export const useCreateDog = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createEditDog,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['dogs']);
      queryClient.invalidateQueries(['myDog', data.userId]);
      toast.success('Profile submitted!');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createDog: mutate, isCreating: isLoading };
};

export const useEditDog = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newDogData, id }) => createEditDog(newDogData, id),
    onSuccess: (data) => {
      toast.success('Profile successfully edited');
      queryClient.invalidateQueries({ queryKey: ['dogs'] });
      queryClient.invalidateQueries(['dog', data.id]);
      queryClient.invalidateQueries(['myDog', data.userId]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { editDog: mutate, isEditing: isLoading };
};
