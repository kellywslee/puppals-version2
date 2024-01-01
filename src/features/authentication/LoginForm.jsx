import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/useAuth';
import Input from '../../ui/Input';
import Button from '../../ui/Button';

const LoginForm = () => {
  const { login, isLoading } = useLogin();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        disabled={isLoading}
        error={errors.email}
      />
      <Input
        label="password"
        register={register}
        required="This field is required"
        type="password"
        placeholder="Password"
        disabled={isLoading}
        error={errors.password}
      />
      <Button type="special">Login</Button>
      {/* {error && <p className=" text-xs text-red-600">{error.message}</p>} */}
      <div className="flex flex-col items-center gap-2 text-xs">
        <Link
          to="/forgotpassword"
          className="mt-2 hover:font-bold hover:underline"
        >
          Forgot password?
        </Link>
        <Link to="/signup" className="hover:font-bold hover:underline">
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
