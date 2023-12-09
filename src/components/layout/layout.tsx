import Header from '../header/header';
import { Outlet } from 'react-router-dom';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header block={'hasNavigation'}/>
      <Outlet />
    </>
  );
}
