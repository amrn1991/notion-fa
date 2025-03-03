import {createFileRoute} from '@tanstack/react-router';
import Auth from '../components/Auth/Auth';

export const Route = createFileRoute('/auth')({
  component: Auth,
});

export default function AuthPage() {
  return <Auth />;
}
