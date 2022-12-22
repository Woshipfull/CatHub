import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Media from 'react-media';
import { GlobalStore } from './stores/GlobalStore';

import { PCLayout, TabletLayout } from './components/layouts/Layouts';
import MainComponent from './components/layouts/MainComponent';

import Breeds from './components/pages/Breeds';
import Gallery from './components/pages/Gallery';
import Voiting from './components/pages/Voiting';
import NotFound from './components/pages/NotFound';
import Favourites from './components/pages/Favourites';

import Home from './components/pages/Home';
import StartPage from './components/pages/StartPage';
import BreedsIDPage from './components/pages/BreedID';

const App = () => {
  const { state, dispatch } = useContext(GlobalStore);
  const currentLocation = useLocation();

  const mainClass =
    state.theme === 'dark' ? 'main-container dark' : 'main-container';

  useEffect(() => {
    const currentPageName = currentLocation.pathname.split('/')[1];
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPageName });
  }, [currentLocation.pathname, dispatch]);

  return (
    <div className={mainClass}>
      <Media
        queries={{
          pc: '(min-width: 1200px)',
        }}
      >
        {(matches) => (
          <Routes>
            <Route path="/" element={matches.pc ? <PCLayout /> : <TabletLayout />}>
              <Route index element={matches.pc ? <Home /> : <StartPage />} />
              <Route element={<MainComponent />}>
                <Route path="voiting" element={<Voiting />} />
                <Route path="breeds" element={<Breeds />} />
                <Route path="breeds/:breedId" element={<BreedsIDPage />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="favourites" element={<Favourites />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Media>
    </div>
  );
};

export default App;
