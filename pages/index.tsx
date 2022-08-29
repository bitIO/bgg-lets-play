import { UsersSelector } from '../components/UsersSelector/UsersSelector';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <UsersSelector />
    </>
  );
}
