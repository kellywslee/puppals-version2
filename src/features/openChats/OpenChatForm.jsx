import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { useMyDog } from '../../hooks/useDogs';
import { useCreateOpenChat, useEditOpenChat } from '../../hooks/useChats';
import Button from '../../ui/Button';

// eslint-disable-next-line react/prop-types
const OpenChatForm = ({ chatToEdit = {}, onCloseModal }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { myDog, isLoadingMyDog } = useMyDog(user?.id);
  const { isCreatingOpenChat, createOpenChat } = useCreateOpenChat();
  const { isEditingOpenChat, editOpenChat } = useEditOpenChat();
  const isWorking = isCreatingOpenChat || isEditingOpenChat || isLoadingMyDog;

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
      editOpenChat(
        { ...data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard/openchats');
          },
        },
      );
    else
      createOpenChat(
        { ...data, userId: user.id, dogId: myDog[0].id, isPrivate: false },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard/openchats');
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

      <div className="flex gap-1">
        <Button onClick={onCloseModal} type="outline">
          Cancel
        </Button>
        <Button type="profileEdit">{isEditSession ? 'Edit' : 'Create'}</Button>
      </div>
    </form>
  );
};

export default OpenChatForm;
