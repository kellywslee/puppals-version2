import { Outlet } from 'react-router-dom';
import SearchOperation from '../features/findPlaydates/SearchOperation';
import Map from '../features/findPlaydates/Map';

const FindPlaydates = () => {
  return (
    <main>
      <SearchOperation />
      <section className="flex flex-col">
        <Outlet />
        <Map />
      </section>
    </main>
  );
};

export default FindPlaydates;
