import StatusBoard from '../features/dashboard/StatusBoard';
import UserDogProfile from '../features/dashboard/UserDogProfile';

const Dashboard = () => {
  return (
    <main className="gap-2">
      <h1>Dashboard</h1>
      <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:rounded-lg md:border-2 md:p-2">
        <StatusBoard />
        <UserDogProfile />
      </div>
    </main>
  );
};

export default Dashboard;
