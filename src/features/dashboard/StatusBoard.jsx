import { GoMail } from 'react-icons/go';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { PiDogFill, PiDog } from 'react-icons/pi';

const StatusBoard = () => {
  const list = [
    { id: 1, name: 'Messages', icon: <GoMail /> },
    { id: 2, name: 'Groups', icon: <LiaUserFriendsSolid /> },
    { id: 3, name: 'Followers', icon: <PiDogFill /> },
    { id: 4, name: 'Following', icon: <PiDog /> },
  ];
  return (
    <section className="w-11/12 rounded-lg border-2 p-4">
      <ul className="grid grid-cols-2 gap-5">
        {list.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-center rounded-lg bg-gray-200 p-2"
          >
            <span className="mr-2 text-3xl">{item.icon}</span>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default StatusBoard;
