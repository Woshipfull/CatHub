import { Outlet } from 'react-router-dom';
import StartPage from '../pages/StartPage';

const PCLayout = () => (
  <div className="layout">
    <div className="window">
      <StartPage />
    </div>
    <div className="window">
      <Outlet />
    </div>
  </div>
);

const TabletLayout = () => (
  <div className="layout">
    <div className="window">
      <Outlet />
    </div>
  </div>
);

export { PCLayout, TabletLayout };
