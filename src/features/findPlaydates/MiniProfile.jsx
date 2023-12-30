import { Link } from 'react-router-dom';
import { useDog } from '../../hooks/useDogs';

const MiniProfile = () => {
  const { dog, isLoading, error } = useDog();
  return <div>MiniProfile</div>;
};

export default MiniProfile;
