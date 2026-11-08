import { useRoutes } from 'react-router';
import { routes } from './index';

export default function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}
