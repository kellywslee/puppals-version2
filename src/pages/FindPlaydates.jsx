import { Outlet } from 'react-router-dom';
import SearchOperation from '../features/findPlaydates/SearchOperation';
import Map from '../features/findPlaydates/Map';

const FindPlaydates = () => {
  return (
    <main className="gap-2">
      <h1>Find Playdates!</h1>
      <SearchOperation />
      <section className="flex w-full flex-col gap-2 lg:flex-row lg:gap-4">
        <Map />
        <Outlet />
      </section>
    </main>
  );
};

export default FindPlaydates;
