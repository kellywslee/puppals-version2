import party from '../assets/party.JPG';
import play from '../assets/play.png';

const AboutUs = () => {
  return (
    <main className="gap-2  lg:flex-row lg:gap-12">
      <section className="flex w-11/12 grow flex-col justify-center gap-4 lg:w-1/2 lg:gap-6">
        <h2 className="text-sm font-bold text-org md:text-lg lg:w-9/12 lg:self-center lg:text-3xl">
          About Us
        </h2>
        <p className="text-xs md:text-base lg:w-9/12 lg:self-center lg:text-lg">
          Welcome to PupPals! Here at pupPals, we share a simple yet powerful
          vision: fostering connections between our beloved four-legged pals. We
          understand how pivotal social interactions are for dogs, and our
          platform is a testament to the lengths we&apos;ll go to ensure they
          make furry friends and enjoy quality playdates.
        </p>
        <img
          src={party}
          alt="Group of five adorable dogs sitting on a bench with a checkered blanket, gettring photo graphed"
          className="lg:w-62 w-44 self-center rounded-3xl border-2 border-slate-950 shadow-sp md:w-56 lg:mt-4"
        />
      </section>
      <section className="flex w-11/12 grow flex-col justify-center gap-4 lg:w-1/2 lg:gap-6">
        <img
          src={play}
          alt="Two fluffy dogs playing tug-of-war with a stick in a park"
          className="lg:w-62 w-44 self-center rounded-3xl border-2 border-slate-950 shadow-sp md:w-56 lg:mb-4"
        />
        <h2 className="text-sm font-bold text-org md:text-lg lg:w-9/12 lg:self-center lg:text-3xl">
          What is PupPals?
        </h2>
        <p className="text-xs md:text-base lg:w-9/12 lg:self-center lg:text-lg">
          PupPals is more than just a dog-owner&apos;s platform—it&apos;s a
          community. We&apos;ve crafted an interactive experience, making it
          seamless for dog owners to discover, connect, and interact with others
          in their neighbourhood. Users can scout through profiles to find
          suitable matches based on a dog&apos;s name, breed, age, size, energy
          level, and more.
        </p>
      </section>
    </main>
  );
};

export default AboutUs;
