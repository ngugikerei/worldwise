import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

//serves to protect routes when user in authenticated
export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //checks whether user is authenticated and navigates accordingly
  useEffect(
    function () {
      if (!isAuthenticated) navigate('/');
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null;
}
