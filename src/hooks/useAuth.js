import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../services/apiAuth';
import { signup as signupApi } from '../services/apiAuth';
import { logout as logoutApi } from '../services/apiAuth';
import { getCurrentUser } from '../services/apiAuth';
import { updateUser as updateUserApi } from '../services/apiAuth';
import { resetPassword as resetPasswordApi } from '../services/apiAuth';
import { deleteUser as deleteUserApi } from '../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Email or password are incorrect');
    },
  });

  return { login, isLoading, error };
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signup,
    isLoading,
    error,
  } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      toast.success('Account successfully created!');
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading, error };
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['user'], {
        refetchActive: true,
        refetchInactive: true,
      });
      navigate('/login', { replace: true });
    },
  });

  return { logout, isLoading };
};

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  const isAuthenticated = user?.role === 'authenticated';

  return { isLoadingUser: isLoading, user, isAuthenticated };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
};

export const useResetPassword = () => {
  const { mutate: resetPassword, isLoading: isResetting } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success('Please check your email for password reset instructions.');
    },
    onError: (err) => toast.error(err.message),
  });

  return { resetPassword, isResetting };
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUser, isLoading: isDeleting } = useMutation({
    mutationFn: ({ id, delete_request_received }) =>
      deleteUserApi(id, delete_request_received),

    onSuccess: () => {
      toast.success(
        'Delete request sent! Please allow up to 5 business days for it to be processed and take effect.',
      );
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteUser };
};
