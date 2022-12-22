import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Bar from '../parts/Bar';

const MainComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { userName } = window.localStorage;
    if (userName === undefined) {
      navigate('/');
    }
  });

  return (
    <>
      <Bar />
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default MainComponent;
