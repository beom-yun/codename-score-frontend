import { useNavigate } from 'react-router-dom';
import useUser from '../lib/useUser';
import { useEffect } from 'react';

interface IProtectedPageProps {
  children: React.ReactNode;
}

export default function ProtectedPage({ children }: IProtectedPageProps) {
  const { isLoggedIn, userLoading } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLoading) {
      if (!isLoggedIn) {
        navigate('/');
      }
    }
  }, [isLoggedIn, userLoading, navigate]);
  return <>{children}</>;
}
