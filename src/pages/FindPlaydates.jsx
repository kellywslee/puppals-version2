import { Outlet } from 'react-router-dom';
import SearchOperation from '../features/findPlaydates/SearchOperation';
import Map from '../features/findPlaydates/Map';

const FindPlaydates = () => {
  return (
    <main>
      <h1>Find Playdates!</h1>
      <SearchOperation />
      <section className="flex flex-col">
        <Outlet />
        <Map />
      </section>
    </main>
  );
};

export default FindPlaydates;
