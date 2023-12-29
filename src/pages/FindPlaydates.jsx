import { Outlet } from 'react-router-dom';
import SearchOperation from '../features/findPlaydates/SearchOperation';
import Map from '../features/findPlaydates/Map';

const FindPlaydates = () => {
  return (
    <main className="flex-row gap-4">
      <SearchOperation />
      <Outlet />
      <Map />
    </main>
  );
};

export default FindPlaydates;
