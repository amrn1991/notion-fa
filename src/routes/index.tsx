import {createFileRoute} from '@tanstack/react-router';
import Page from '../components/Page/Page';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="p-2">
      <Page />
    </div>
  );
}
