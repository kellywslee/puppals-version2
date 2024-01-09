const Footer = () => {
  return (
    <footer className="h-18 flex w-full items-center justify-center bg-green2 p-2">
      <div className=" flex w-11/12 max-w-7xl flex-col items-center justify-center gap-y-1 text-center text-xs">
        <p>YorkU Full-Stack Web Development Program Project 2023</p>
        <p>
          Developed and designed with love ❤️
          <a
            href="https://kellyws.me"
            rel="noopener noreferrer"
            target="_blank"
            className="transition-all hover:font-bold hover:underline"
            title="Visit Kelly Lee's personal website"
            aria-label="Kelly Lee's personal website"
          >
            Kelly Lee
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
