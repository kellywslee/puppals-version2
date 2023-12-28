import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import {
  getCurrentUsersDog,
  getDogs,
  getDog,
  createEditDog,
} from '../services/apiDogs';
import { toast } from 'react-hot-toast';

export const useMyDog = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['myDog'],
    queryFn: getCurrentUsersDog,
  });
  return { myDog: data, isLoading, error };
};

export const useDogs = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dogs'],
    queryFn: getDogs,
  });
  return { dogs: data, isLoading, error };
};

export const useDog = () => {
  const { dogId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['dog', dogId],
    queryFn: () => getDog(dogId),
  });
  return { dog: data, isLoading, error };
};

export const useCreateDog = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createEditDog,
    onSuccess: () => {
      queryClient.invalidateQueries(['dogs']);
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
    onSuccess: () => {
      toast.success('Profile successfully edited');
      queryClient.invalidateQueries({ queryKey: ['dogs'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editDog: mutate, isEditing: isLoading };
};
