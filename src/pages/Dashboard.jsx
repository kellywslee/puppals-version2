import StatusBoard from '../features/dashboard/StatusBoard';
import UserDogProfile from '../features/dashboard/UserDogProfile';

const Dashboard = () => {
  return (
    <main className="gap-2">
      <h1>Dashboard</h1>
      <div className="flex flex-col items-center justify-center gap-2 lg:flex">
        <StatusBoard />
        <UserDogProfile />
      </div>
    </main>
  );
};

export default Dashboard;
