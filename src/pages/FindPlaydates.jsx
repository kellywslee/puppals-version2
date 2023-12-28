import Sidebar from '../ui/Sidebar';
import Map from '../features/findPlaydates/Map';

const FindPlaydates = () => {
  return (
    <main className="mx-auto flex w-11/12 max-w-7xl grow flex-col gap-2 pt-12 lg:flex-row lg:gap-12">
      <Sidebar />
      <Map />
    </main>
  );
};

export default FindPlaydates;
