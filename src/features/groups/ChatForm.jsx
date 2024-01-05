import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { useCreateGroupChat, useEditGroupChat } from '../../hooks/useChats';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const ChatForm = ({ chatToEdit = {}, onCloseModal }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isCreatingGroupChat, createGroupChat } = useCreateGroupChat();
  const { isEditingGroupChat, editGroupChat } = useEditGroupChat();
  const isWorking = isCreatingGroupChat || isEditingGroupChat;

  const { id: editId, ...editValues } = chatToEdit;
  const isEditSession = Boolean(editId);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: isEditSession ? editValues : {},
  });

  const onSubmit = async (data) => {
    if (isEditSession)
      editGroupChat(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard/groups');
          },
        },
      );
    else
      createGroupChat(
        { ...data, userId: user.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard/groups');
          },
        },
      );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
      className="flex w-11/12 max-w-xs flex-col gap-2"
    >
      <label htmlFor="name" className="text-sm font-semibold">
        Group Chat Name&#42;
      </label>
      <input
        id="name"
        name="name"
        type="text"
        maxLength={40}
        {...register('name', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.name ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.name && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.name.message}
        </p>
      )}
      <label htmlFor="isPrivate" className="text-sm font-semibold">
        Is this a private chat?&#42;
      </label>
      <select
        id="isPrivate"
        name="isPrivate"
        type="text"
        {...register('isPrivate', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.isPrivate ? 'true' : 'false'}
        className="mb-2 h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      >
        <option value=""></option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {errors.isPrivate && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.isPrivate.message}
        </p>
      )}

      <div className="flex gap-1">
        <Button onClick={onCloseModal} type="outline">
          Cancel
        </Button>
        <Button type="profileEdit">{isEditSession ? 'Edit' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default ChatForm;
