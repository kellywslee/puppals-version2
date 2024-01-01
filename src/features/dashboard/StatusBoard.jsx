import { GoMail } from 'react-icons/go';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDogFill, PiDog } from 'react-icons/pi';

const StatusBoard = () => {
  const list = [
    { id: 1, name: 'Profile', icon: <GoMail /> },
    { id: 2, name: 'Messages', icon: <GoMail /> },
    { id: 3, name: 'Groups', icon: <LiaUserFriendsSolid /> },
    { id: 4, name: 'Followers', icon: <PiDogFill /> },
    { id: 5, name: 'Following', icon: <PiDog /> },
    { id: 6, name: 'Setting', icon: <PiDog /> },
  ];
  return (
    <section className="w-11/12 rounded-lg border-2 p-3 text-xs lg:w-1/4">
      <ul className="grid grid-cols-2 gap-1 md:grid-cols-4 lg:grid-cols-1 lg:gap-2">
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
