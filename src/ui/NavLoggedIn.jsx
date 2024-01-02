import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useAuth';
import Hamburger from 'hamburger-react';
import SpinnerMini from './SpinnerMini';
import Button from './Button';

const menus = [
  { id: 1, name: 'PupPals', path: '/' },
  { id: 2, name: 'ABOUT US', path: '/aboutus' },
  { id: 3, name: 'FAQ', path: '/faq' },
  { id: 4, name: 'DASHBOARD', path: '/dashboard' },
  { id: 5, name: 'FIND PLAYDATES', path: '/findplaydates' },
  { id: 6, name: 'CONTACT US', path: '/contactus' },
];

const NavLoggedIn = () => {
  const [isHambugerOpen, setHamburgerOpen] = useState(false);

  const hamburgerRef = useRef(null);
  const dropdownRef = useRef(null);

  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate('/');
  };

  // Close dropdown when user lands on a new page
  const closeMenu = () => {
    setHamburgerOpen(false);
  };

  // Close dropdown when the window is resized to a larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setHamburgerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div
        ref={dropdownRef}
        className={`${
          isHambugerOpen
            ? 'absolute right-0 top-full z-50 flex h-dvh w-full flex-col items-center justify-center gap-y-6 bg-slate-50 pb-12'
            : 'hidden lg:flex lg:w-11/12 lg:max-w-7xl lg:items-center lg:justify-between lg:gap-x-6'
        }`}
      >
        <ul className="flex w-full flex-col items-center gap-x-6 gap-y-6 lg:flex-row">
          {menus.map((menu) => (
            <li
              key={menu.id}
              className={
                menu.name === 'PupPals'
                  ? 'font-brand text-xl transition-all duration-300 ease-in-out hover:text-org'
                  : 'text-sm transition-all duration-300 ease-in-out hover:font-bold'
              }
            >
              <Link to={menu.path} onClick={closeMenu}>
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="lg:space-betwen flex gap-x-4">
          <li>
            <Button onClick={handleClick} type="special">
              {!isLoading ? 'Log Out' : <SpinnerMini />}
            </Button>
          </li>
        </ul>
      </div>

      <div ref={hamburgerRef} className="z-50 block justify-end lg:hidden">
        <Hamburger
          toggled={isHambugerOpen}
          toggle={() => setHamburgerOpen((prev) => !prev)}
          label="Show menu"
          size={18}
        />
      </div>
    </>
  );
};

export default NavLoggedIn;
