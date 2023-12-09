import { Navigate } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../../const';
import { getAuthStatus } from '../../store/users-process/user-process-selectors';
import { useAppSelector } from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
  redirectTo: AppRoute;
}

export default function PrivateRoute({ children, redirectTo }: PrivateRouteProps): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.NoAuth) {
    return <Navigate to={redirectTo} />;
  }

  return children;
}
