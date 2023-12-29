import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { useCreateDog, useEditDog } from '../../hooks/useDogs';

// eslint-disable-next-line react/prop-types
const ProfileForm = ({ dogToEdit = {}, onCloseModal }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { isCreating, createDog } = useCreateDog();
  const { isEditing, editDog } = useEditDog();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = dogToEdit;
  const isEditSession = Boolean(editId);

  const today = new Date().toISOString().split('T')[0];

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: isEditSession ? editValues : {},
  });

  const fetchGeocode = useCallback(async (postalCode) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${postalCode}&key=${
      import.meta.env.VITE_OPENCAGE_API_KEY
    }`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry;
      return location;
    }
    return null;
  }, []);

  const onSubmit = async (data) => {
    const location = await fetchGeocode(data.postalCode);
    if (!location) {
      console.error('Geolocation could not be fetched');
      return;
    }

    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession)
      editDog(
        {
          newDogData: {
            ...data,
            location: location,
            image: image,
          },
          id: editId,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard');
          },
        },
      );
    else
      createDog(
        { ...data, image: image, location: location, userId: user.id },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
            navigate('/dashboard');
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
        Name&#42;
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

      <label htmlFor="sex" className="text-sm font-semibold">
        Sex&#42;
      </label>
      <select
        id="sex"
        name="sex"
        type="text"
        {...register('sex', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.sex ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      >
        <option value=""></option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      {errors.sex && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.sex.message}
        </p>
      )}

      <label htmlFor="breed" className="text-sm font-semibold">
        Breed&#42;
      </label>
      <input
        id="breed"
        name="breed"
        type="text"
        maxLength={40}
        {...register('breed', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.breed ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.breed && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.breed.message}
        </p>
      )}

      <label htmlFor="size" className="text-sm font-semibold">
        Size&#42;
      </label>
      <select
        id="size"
        name="size"
        type="text"
        {...register('size', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.size ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      >
        <option value=""></option>
        <option value="Small">Small (&lt; 20lb)</option>
        <option value="Medium">Medium (20 - 55lb)</option>
        <option value="Large">Large (&gt; 55lb)</option>
      </select>
      {errors.size && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.size.message}
        </p>
      )}

      <label htmlFor="dateOfBirth" className="text-sm font-semibold">
        Date of Birth&#42;
      </label>
      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        min="1990-01-01"
        max={today}
        disabled={isWorking}
        {...register('dateOfBirth', {
          required: isEditSession ? false : 'This field is required',
        })}
        aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.dateOfBirth && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.dateOfBirth.message}
        </p>
      )}

      <label htmlFor="energyLevel" className="text-sm font-semibold">
        Energy Level&#42;
      </label>
      <select
        id="energyLevel"
        name="energyLevel"
        type="text"
        {...register('energyLevel', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.energyLevel ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      >
        <option value=""></option>
        <option value="Low">Low</option>
        <option value="Moderate">Moderate</option>
        <option value="High">High</option>
      </select>
      {errors.energyLevel && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.energyLevel.message}
        </p>
      )}

      <label htmlFor="postalCode" className="text-sm font-semibold">
        Postal Code&#42;
      </label>
      <input
        id="postalCode"
        name="postalCode"
        type="text"
        {...register('postalCode', {
          required: isEditSession ? false : 'This field is required',
          pattern: {
            value: /[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9]/i,
            message:
              'Please enter a valid Canadian postal code (e.g., M1M 1M1 or M1M1M1)',
          },
        })}
        disabled={isWorking}
        aria-invalid={errors.postalCode ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.postalCode && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.postalCode.message}
        </p>
      )}

      <label htmlFor="nameOfPawrents" className="text-sm font-semibold">
        Name of Pawrents&#42;
      </label>
      <input
        id="nameOfPawrents"
        name="nameOfPawrents"
        type="text"
        maxLength={40}
        {...register('nameOfPawrents', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.nameOfPawrents ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.nameOfPawrents && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.nameOfPawrents.message}
        </p>
      )}

      <label htmlFor="message" className="text-sm font-semibold">
        Message&#42;
      </label>
      <textarea
        id="message"
        name="message"
        type="text"
        rows="5"
        maxLength={210}
        {...register('message', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        className="w-full bg-white p-2 font-sans text-sm outline-slate-950"
      />
      {errors.message && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.message.message}
        </p>
      )}

      <label htmlFor="image" className="text-sm font-semibold">
        Image&#42;
      </label>
      <input
        id="image"
        name="image"
        type="file"
        accept="image/*"
        {...register('image', {
          required: isEditSession ? false : 'This field is required',
        })}
        className="font-sans text-sm file:mr-3 file:border-0 file:p-2 file:font-semibold hover:file:bg-org"
      />
      {errors.image && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.image.message}
        </p>
      )}

      <label htmlFor="isActive" className="text-sm font-semibold">
        Make Dog&apos;s Profile Searchable?&#42;
      </label>
      <select
        id="isActive"
        name="isActive"
        type="text"
        {...register('isActive', {
          required: isEditSession ? false : 'This field is required',
        })}
        disabled={isWorking}
        aria-invalid={errors.isActive ? 'true' : 'false'}
        className="h-10 w-full bg-white p-2 font-sans text-sm outline-slate-950"
      >
        <option value=""></option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {errors.isActive && (
        <p role="alert" className="self-start text-xs text-red-600">
          {errors.isActive.message}
        </p>
      )}

      <button className="m-2 h-12 w-full rounded-lg bg-org p-2 font-bold">
        Edit
      </button>
    </form>
  );
};

export default ProfileForm;
