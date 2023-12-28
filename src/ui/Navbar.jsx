import { useUser } from '../hooks/useAuth';
import NavNotLoggedIn from './NavNotLoggedIn';
import NavLoggedIn from './NavLoggedIn';

const Navbar = () => {
  const { isAuthenticated } = useUser();
  return (
    <nav className="lg:center lg:center fixed left-0 right-0 top-0 z-50 flex justify-end bg-green1 lg:h-20 lg:justify-center">
      {isAuthenticated ? <NavLoggedIn /> : <NavNotLoggedIn />}
    </nav>
  );
};

export default Navbar;
