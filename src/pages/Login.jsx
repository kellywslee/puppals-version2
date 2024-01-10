import LoginForm from '../features/authentication/LoginForm';

const Login = () => {
  return (
    <main className="gap-6">
      <h1>Log In</h1>
      <p className="text-center text-xs">
        For demo purposes, please log in with the provided demo credentials
        below.
      </p>
      <LoginForm />
    </main>
  );
};

export default Login;
