import { Outlet } from 'react-router-dom';
import StartPage from '../pages/StartPage';

const PCLayout = () => (
  <>
    <div className="window">
      <StartPage />
    </div>
    <div className="window">
      <Outlet />
    </div>
  </>
);

const TabletLayout = () => (
  <div className="window">
    <Outlet />
  </div>
);

export { PCLayout, TabletLayout };
