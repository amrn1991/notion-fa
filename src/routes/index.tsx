import {createFileRoute} from '@tanstack/react-router';
import Page from '../components/Page/Page';
import Private from '../components/Auth/Private';
import {AppStateProvider} from '../context/AppStateContext';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  console.log('index');
  return (
    <Private
      component={
        <AppStateProvider>
          <Page />
        </AppStateProvider>
      }
    />
  );
}
