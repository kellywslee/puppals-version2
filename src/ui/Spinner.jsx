const Spinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <div
        style={{
          width: '2rem',
          height: '2rem',
          border: '0.2rem solid red',
          borderBottomColor: 'transparent',
          animation: 'rotation 1s linear infinite',
        }}
        className="border-box inline-block rounded-full"
      ></div>
    </div>
  );
};

export default Spinner;
