import {ReactElement} from 'react';
import {useAuthStore} from '../../utils/useAuth';
import {Navigate} from '@tanstack/react-router';

type PrivateProps = {
  component: ReactElement;
};

export default function Private({component}: PrivateProps) {
  const {session, loading} = useAuthStore();

  if (loading) {
    return <>در حال پردازش</>;
  }

  return session ? component : <Navigate to="/auth" />;
}
