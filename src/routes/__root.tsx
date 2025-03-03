import {Outlet, createRootRoute} from '@tanstack/react-router';
import {AppStateProvider} from '../utils/AppStateContext';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AppStateProvider>
      <Outlet />
    </AppStateProvider>
  );
}
