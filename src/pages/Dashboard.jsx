import { Outlet } from 'react-router-dom';
import DashboardMenu from '../ui/DashboardMenu';

const Dashboard = () => {
  return (
    <main className="gap-2">
      <h1>Dashboard</h1>
      <div className="flex w-full  flex-col items-center justify-center gap-2 md:flex-row md:rounded-lg md:border-1 md:p-2">
        <DashboardMenu />
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
