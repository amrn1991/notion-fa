import {createRoot} from 'react-dom/client';
import {RouterProvider, createRouter} from '@tanstack/react-router';
import {routeTree} from './routeTree.gen';
import {AuthSessionProvider} from './utils/AuthContext';
import './index.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  InnerWrap: ({children}) => {
    return (
      <AuthSessionProvider>
        {children}
      </AuthSessionProvider>
    );
  },
});

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
