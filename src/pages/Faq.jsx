const Faq = () => {
  return (
    <main className="gap-2 pb-2">
      <h1 className="p-1">FAQ</h1>
      <article>
        <section className="flex flex-col gap-1">
          <h2 className="bg-green1 p-1">Using PupPals</h2>
          <h3>1. How do I create a profile for my dog?</h3>
          <p>
            After you&apos;ve registered and logged in, navigate to the
            &apos;Profile&apos; section. Here you can add details about your dog
            including name, breed, age, and photos.
          </p>
          <h3>2. Is pupPals free to use?</h3>
          <p>
            Yes, pupPals is free for basic features which include searching for
            dogs, messaging owners, and scheduling playdates.
          </p>
          <h3>3. Can I use pupPals without creating a profile for my dog?</h3>
          <p>
            While you can browse the app without creating a profile, to enjoy
            the full features and to schedule playdates, you&apos;ll need to
            create a dog profile.
          </p>
          <h2 className="bg-green1 p-1">Safety & Privacy</h2>
          <h3>4. How do you ensure my data is secure?</h3>
          <p>
            We take user privacy very seriously. Your data is encrypted and
            stored securely. We do not share or sell your data to third parties
            without explicit consent.
          </p>
          <h3>5. Can others see my personal contact information?</h3>
          <p>
            No, your personal contact details are kept private. When you message
            another user, it is through the PupPals platform without revealing
            personal details.
          </p>
          <h2 className="bg-green1 p-1">Troubleshooting</h2>
          <h3>6. I forgot my password. What should I do?</h3>
          <p>
            Click on the &apos;Forgot Password&apos; link on the login page and
            follow the prompts. You&apos;ll receive an email with steps to reset
            your password.
          </p>
          <h3>7. Why can&apos;t I see images of the dogs?</h3>
          <p>
            Ensure your internet connection is stable. If images still don’t
            load, it might be due to temporary server issues or the user not
            uploading a photo. Try again later or contact support.
          </p>
          <h2 className="bg-green1 p-1">Others</h2>
          <h3>8. How do I report inappropriate behavior?</h3>
          <p>
            If you come across any inappropriate content or behaviour, please
            contact us. Our team will review and take necessary actions.
          </p>
          <h3>9. Can I suggest new features for the app?</h3>
          <p>
            Absolutely! We love feedback. Please contact us through our
            &apos;Feedback&apos; section, and we&apos;ll be happy to hear your
            suggestions.
          </p>
        </section>
      </article>
    </main>
  );
};

export default Faq;
