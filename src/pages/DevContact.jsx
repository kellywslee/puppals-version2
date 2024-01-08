import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { CgWebsite } from 'react-icons/cg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
// import Input from '../ui/Input';
import Button from '../ui/Button';

const DevContact = () => {
  const socialList = [
    {
      id: 1,
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/kelly-ws-lee/',
      icon: <FaLinkedin />,
    },
    {
      id: 2,
      name: 'github',
      url: 'https://www.github.com/kellywslee',
      icon: <FaGithub />,
    },
    {
      id: 3,
      name: 'website',
      url: 'https://kellyws.me',
      icon: <CgWebsite />,
    },
  ];
  const form = useRef();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = () => {
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success('Email Sent!');
          reset();
        },
        (error) => {
          console.log(error.text);
          toast.error(error.message);
        },
      );
  };

  return (
    <main className="gap-2 lg:flex-row lg:gap-6">
      <section className="flex flex-col text-center md:w-3/4 lg:px-10">
        <h1 className="mb-5 md:mb-8 lg:mb-10">Contact the Developer</h1>
        <p>
          Please feel free to get in touch! You can contact me via email at{' '}
          <a className="email" href="mailto:kellyws.lee@gmail.com">
            kellyws.lee@gmail.com
          </a>
          , or you can use the form. I&apos;m always open to new connections and
          opportunities!
        </p>
        <ul className="my-3 flex gap-4 place-self-center">
          {socialList.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Kelly's ${social.name}`}
                title={`Kelly's ${social.name}`}
                className="text-2xl transition-all duration-300 hover:text-org active:text-org"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <form
        ref={form}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-3/4"
      >
        <fieldset className="flex flex-col gap-5">
          <legend className="text-md mb-2 font-bold">Contact Form</legend>

          {errors.name && (
            <p className="self-start text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
          <input
            aria-label="name"
            placeholder="Name"
            type="text"
            {...register('name', { required: 'This field is required' })}
            className="h-10 w-full border-b-1 border-slate-950 p-2 placeholder:text-sm invalid:border-red-600"
          />

          {errors.email && (
            <p className="self-start text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
          <input
            aria-label="email"
            placeholder="Email"
            type="email"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Email is not valid',
              },
            })}
            className="h-10 w-full border-b-1 border-slate-950 p-2 placeholder:text-sm invalid:border-red-600"
          />

          {errors.message && (
            <p className="self-start text-xs text-red-600">
              {errors.message.message}
            </p>
          )}
          <textarea
            aria-label="message"
            placeholder="Message"
            {...register('message', { required: 'This field is required' })}
            className="h-36 w-full overflow-y-auto border-b-1 border-slate-950 p-2 placeholder:text-sm invalid:border-red-600"
          />

          <Button type="contact">Send</Button>
        </fieldset>
      </form>
    </main>
  );
};

export default DevContact;
