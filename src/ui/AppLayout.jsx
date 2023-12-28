import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div className="flex h-dvh flex-col">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
