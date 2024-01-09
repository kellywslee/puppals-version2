import { Link } from 'react-router-dom';
import { GoMail } from 'react-icons/go';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDogFill } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';

const DashboardMenu = () => {
  const list = [
    {
      id: 1,
      name: 'My Playdates',
      icon: <PiDogFill />,
      path: '/dashboard/myplaydates',
    },
    { id: 2, name: 'Profile', icon: <CgProfile />, path: '/dashboard/profile' },

    {
      id: 3,
      name: 'Open Chats',
      icon: <LiaUserFriendsSolid />,
      path: '/dashboard/openchats',
    },
    {
      id: 4,
      name: 'Private Chats',
      icon: <GoMail />,
      path: '/dashboard/privatechats',
    },
  ];
  return (
    <section className="w-full rounded-lg border-1 p-3 text-xs md:w-1/3">
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-1">
        {list.map((item) => (
          <li key={item.id} className="w-full">
            <Link
              to={item.path}
              className="flex justify-center gap-2 rounded-lg bg-gray-200 p-2 text-xs hover:font-bold hover:transition-all"
            >
              <span className="text-lg md:text-xl lg:text-2xl">
                {item.icon}
              </span>
              <p className="place-self-center">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DashboardMenu;
