import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import mainPhoto from '../assets/bunchaziggy.png';

const Home = () => {
  return (
    <main className="lg:flex-row lg:gap-16">
      <section className="mb-5 flex h-48 w-48 items-center justify-center  rounded-3xl bg-org md:h-56 md:w-56">
        <img
          className="h-5/6 w-5/6 rounded-3xl border-org object-cover"
          src={mainPhoto}
          alt="Two small dogs, a black and white one and a tan one, sitting together on a plush dog bed designed to look like a sports car"
        />
      </section>
      <section className="flex flex-col items-center lg:items-start lg:pb-4 ">
        <h1 className="font-brand text-4xl no-underline md:mb-6 md:text-5xl lg:mb-3">
          PupPals
        </h1>
        <h2 className="mb-6 text-2xl font-bold text-green2 md:mb-8 md:text-3xl">
          Find <span className="font-bold text-org">doggie</span> playdates!
        </h2>
        <Link to={'/findplaydates'}>
          <Button>Start Searching</Button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
