import { FaFacebook, FaTiktok, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const socialLinks = [
  {
    id: 1,
    url: 'https://www.facebook.com/',
    icon: <FaFacebook />,
    name: 'Facebook',
  },
  {
    id: 2,
    url: 'https://www.twitter.com/',
    icon: <FaXTwitter />,
    name: 'Twitter',
  },
  {
    id: 3,
    url: 'https://www.instagram.com/',
    icon: <FaInstagram />,
    name: 'Instagram',
  },
  { id: 4, url: 'https://www.tiktok.com/', icon: <FaTiktok />, name: 'TikTok' },
];

const Footer = () => {
  return (
    <footer className="z-1 flex h-16 w-full items-center justify-center bg-green2">
      <div className=" flex w-11/12 max-w-7xl flex-col items-center justify-center gap-y-2 text-xs md:flex-row md:justify-between md:text-xs lg:text-sm">
        <address className="flex flex-col items-center justify-center space-y-1 not-italic md:place-items-start">
          <p className="duration-400 transition ease-in-out hover:text-slate-50">
            <a href="mailto:info@puppals.com">E-mail: info@puppals.com</a>
          </p>
          <p className="duration-400 transition ease-in-out hover:text-slate-50">
            <a href="tel:1-800-PUPPALS">Phone: 1-800-PUPPALS</a>
          </p>
        </address>
        <ul className="flex items-center gap-x-3 text-base md:text-xl">
          {socialLinks.map((link) => (
            <li
              key={link.id}
              className="duration-400 transition ease-in-out hover:text-slate-50"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`puppals's ${link.name}`}
              >
                {link.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
