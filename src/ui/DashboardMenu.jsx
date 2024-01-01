import { Link } from 'react-router-dom';
import { GoMail } from 'react-icons/go';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDogFill, PiDog } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';

const DashboardMenu = () => {
  const list = [
    { id: 1, name: 'Messages', icon: <GoMail />, path: '/dashboard/messages' },
    {
      id: 2,
      name: 'Groups',
      icon: <LiaUserFriendsSolid />,
      path: '/dashboard/groups',
    },
    {
      id: 3,
      name: 'Followers',
      icon: <PiDogFill />,
      path: '/dashboard/followers',
    },
    { id: 4, name: 'Following', icon: <PiDog />, path: '/dashboard/following' },
    { id: 5, name: 'Profile', icon: <CgProfile />, path: '/dashboard/profile' },
    {
      id: 6,
      name: 'Setting',
      icon: <IoSettingsOutline />,
      path: '/dashboard/setting',
    },
  ];
  return (
    <section className="w-full rounded-lg border-1 p-3 text-xs md:w-1/4">
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-1 lg:gap-2">
        {list.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              className="flex items-center justify-center rounded-lg bg-gray-200 p-2"
            >
              <span className="mr-2 flex w-1/3 justify-center text-lg md:text-xl lg:text-2xl">
                {item.icon}
              </span>
              <p className="w-1/2 text-left lg:text-sm">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DashboardMenu;
