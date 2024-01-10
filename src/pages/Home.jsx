import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import mainPhotoSmallWebp from '../assets/mainPhotoSmall.webp';
import mainPhotoLarge from '../assets/mainPhotoLarge.png';
import mainPhotoLargeWebp from '../assets/mainPhotoLarge.webp';

const Home = () => {
  return (
    <main className="lg:flex-row lg:gap-16">
      <section>
        <picture className="mb-5 flex h-48 w-48 items-center justify-center  rounded-3xl bg-org md:h-56 md:w-56">
          <source
            srcSet={mainPhotoSmallWebp}
            media="(max-width: 480px)"
            type="image/webp"
          />
          <source
            srcSet={mainPhotoLargeWebp}
            media="(min-width: 481px) and (max-width: 1024px)"
            type="image/webp"
          />
          <img
            className="h-5/6 w-5/6 rounded-3xl border-org  object-cover"
            src={mainPhotoLarge}
            alt="Two small dogs, a black and white one and a tan one, sitting together on a plush dog bed designed to look like a sports car"
          />
        </picture>
      </section>
      <section
        className="lg:items-s tart flex flex-col
      items-center lg:pb-4 "
      >
        <h1 className="font-brand text-4xl no-underline md:mb-6 md:text-5xl lg:mb-3">
          PupPals
        </h1>
        <h2 className="mb-6 text-xl font-bold text-slate-950 md:mb-8 md:text-2xl">
          Find{' '}
          <span className="underline decoration-org decoration-8 underline-offset-8">
            doggie
          </span>{' '}
          playdates!
        </h2>
        <Link to={'/findplaydates'}>
          <Button type="special">Start Searching</Button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
