import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../hooks/useAuth';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
