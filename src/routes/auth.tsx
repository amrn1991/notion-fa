import {createFileRoute} from '@tanstack/react-router';
import Auth from '../components/Auth/Auth';
import Private from '../components/Auth/Private';

export const Route = createFileRoute('/auth')({
  component: Auth,
});

export default function AuthPage() {
  return <Private component={<Auth />} />;
}
