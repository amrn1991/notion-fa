import {ReactElement} from 'react';
import {Navigate} from '@tanstack/react-router';
import {useAuthSession} from '../../context/AuthContext';

type PrivateProps = {
  component: ReactElement;
};

export default function Private({component}: PrivateProps) {
  const {session, loading} = useAuthSession();

  if (loading) {
    return <>در حال پردازش</>;
  }

  return session ? component : <Navigate to="/auth" />;
}
