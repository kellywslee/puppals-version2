import Followers from './Followers';
import Following from './Following';

const Playdates = () => {
  return (
    <section className="flex w-full flex-col gap-2 p-2">
      <h2 className="text-center text-base md:text-lg lg:text-xl">
        My Playdates
      </h2>
      <div className="flex flex-col gap-2 md:flex-row md:items-start ">
        <Followers />
        <Following />
      </div>
    </section>
  );
};

export default Playdates;
