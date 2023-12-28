import StatusBoard from '../features/dashboard/StatusBoard';
import UserDogProfile from '../features/dashboard/UserDogProfile';

const Dashboard = () => {
  return (
    <main className="gap-3">
      <h1>Dashboard</h1>
      <StatusBoard />
      <UserDogProfile />
    </main>
  );
};

export default Dashboard;
