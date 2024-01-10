import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../../hooks/useAuth';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const SignUpForm = () => {
  const { signup, isLoading, error } = useSignup();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  // const onSubmit = (data) => {
  //   const { email, password, confirmPassword } = data;
  //   signup(
  //     { email, password, confirmPassword },
  //     {
  //       onSettled: () => {
  //         reset();
  //       },
  //     },
  //   );
  // };

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="flex w-11/12 max-w-md flex-col items-center justify-center gap-y-4"
    >
      <Input
        label="email"
        register={register}
        required="This field is required"
        pattern={{
          value:
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          message: 'Email is not valid',
        }}
        type="email"
        placeholder="Email"
        // disabled={isLoading}
        disabled={true}
        error={errors.email}
      />
      <Input
        label="password"
        register={register}
        required="This field is required"
        minLength={{
          value: 6,
          message: 'Password must be at least 6 characters',
        }}
        type="password"
        placeholder="Password"
        // disabled={isLoading}
        disabled={true}
        error={errors.password}
      />
      <Input
        label="confirmPassword"
        register={register}
        required="This field is required"
        type="password"
        placeholder="Confirm Password"
        // disabled={isLoading}
        disabled={true}
        error={errors.confirmPassword}
      />
      <Button type="special">Sign Up</Button>
      {error && <p className=" text-xs text-red-600">{error.message}</p>}
      <div className="flex flex-col items-center gap-2 text-xs">
        <Link
          to="/forgotpassword"
          className="mt-2 hover:font-bold hover:underline"
        >
          Forgot password?
        </Link>
        <Link to="/login" className="hover:font-bold hover:underline">
          Already a member? Sign In!
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
