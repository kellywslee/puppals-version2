import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { useCreateDog, useEditDog } from '../../hooks/useDogs';
import Input from '../../ui/Input';

const ProfileForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dogToEdit = location.state?.dog;
  const editId = dogToEdit?.id;
  const isEditSession = Boolean(editId);
  const { user } = useUser();
  const { isCreating, createDog } = useCreateDog();
  const { isEditing, editDog } = useEditDog();
  const isWorking = isCreating || isEditing;

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

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
    console.log('location', location);

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
            navigate('/dashboard');
          },
        },
      );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-11/12 max-w-xs flex-col items-center justify-center gap-y-4"
    >
      <Input
        label="name"
        register={register}
        required="This field is required"
        type="text"
        placeholder="Name"
        disabled={isWorking}
        error={errors.name}
      />
      <select
        {...register('sex')}
        className=" h-10 w-full bg-white p-2 font-sans text-base"
      >
        <option value=""></option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <Input
        label="breed"
        register={register}
        required="This field is required"
        type="text"
        placeholder="Breed"
        disabled={isWorking}
        error={errors.breed}
      />
      <select
        {...register('size')}
        className=" h-10 w-full  bg-white p-2 font-sans text-base"
      >
        <option value=""></option>
        <option value="small">Small (&lt; 20lb)</option>
        <option value="medium">Medium (20 - 55lb)</option>
        <option value="large">Large (&gt; 55lb)</option>
      </select>
      <Input
        label="dateOfBirth"
        register={register}
        required="This field is required"
        type="date"
        placeholder="Date of Birth"
        disabled={isWorking}
        error={errors.dateOfBirth}
      />
      <select
        {...register('energyLevel')}
        className=" h-10 w-full  bg-white p-2 font-sans text-base"
      >
        <option value=""></option>
        <option value="low">Low</option>
        <option value="moderate">Moderate</option>
        <option value="high">High</option>
      </select>
      <Input
        label="postalCode"
        register={register}
        required="This field is required"
        type="text"
        placeholder="Postal Code"
        disabled={isWorking}
        error={errors.postalCode}
      />
      <Input
        label="nameOfPawrents"
        register={register}
        required="This field is required"
        type="text"
        placeholder="Name of Pawrents"
        disabled={isWorking}
        error={errors.nameOfPawrents}
      />
      <textarea
        {...register('message')}
        type="text"
        placeholder="Message"
        cols={4}
        disabled={isWorking}
        className=" h-10 w-full  bg-white p-2 font-sans text-base"
      />
      <input
        aria-label="image"
        id="image"
        type="file"
        accept="image/*"
        {...register('image', {
          required: isEditSession ? false : 'This field is required',
        })}
      />
      <button>Submit</button>
    </form>
  );
};

export default ProfileForm;
