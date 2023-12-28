import { Outlet } from 'react-router-dom';
import Filter from '../features/findPlaydates/Filter';

const Sidebar = () => {
  return (
    <aside>
      <Filter />
      <Outlet />
    </aside>
  );
};

export default Sidebar;
