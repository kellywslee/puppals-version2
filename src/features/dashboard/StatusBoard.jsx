import { GoMail } from 'react-icons/go';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDogFill, PiDog } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';

const StatusBoard = () => {
  const list = [
    { id: 1, name: 'Messages', icon: <GoMail /> },
    { id: 2, name: 'Groups', icon: <LiaUserFriendsSolid /> },
    { id: 3, name: 'Followers', icon: <PiDogFill /> },
    { id: 4, name: 'Following', icon: <PiDog /> },
    { id: 5, name: 'Profile', icon: <CgProfile /> },
    { id: 6, name: 'Setting', icon: <IoSettingsOutline /> },
  ];
  return (
    <section className="md:border-right w-full rounded-lg border-2 p-3 text-xs md:w-1/4 md:border-none">
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-1">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-center rounded-lg bg-gray-200 p-2"
          >
            <span className="mr-2 text-lg md:text-xl lg:text-2xl">
              {item.icon}
            </span>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatusBoard;
