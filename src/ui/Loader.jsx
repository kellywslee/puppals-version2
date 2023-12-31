import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  return (
    <Hearts
      color="#ffbf69"
      wrapperStyle={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    />
  );
};

export default Loader;
