import { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Media from 'react-media';
import { uniq } from 'lodash';

import { toast } from 'react-toastify';

import { GlobalStore } from './stores/GlobalStore';
import votesStore from './stores/VotesStore';
import favouritesStore from './stores/FavouritesStore';
import galleryStore from './stores/GalleryStore';
import breedsStore from './stores/BreedsStore';

import { PCLayout, TabletLayout } from './components/layouts/Layouts';
import MainComponent from './components/layouts/MainComponent';

import Breeds from './components/pages/Breeds';
import Gallery from './components/pages/Gallery';
import Votes from './components/pages/Votes';
import NotFound from './components/pages/NotFound';

import Home from './components/pages/Home';
import StartPage from './components/pages/StartPage';
import BreedsIDPage from './components/pages/BreedID';
import Favourites from './components/pages/Favourites';

const App = () => {
  const { state, dispatch } = useContext(GlobalStore);
  const currentLocation = useLocation();
  const { userName } = window.localStorage;

  const mainClass =
    state.theme === 'dark' ? 'main-container dark' : 'main-container';

  useEffect(() => {
    const currentPageName = currentLocation.pathname.split('/')[1];
    dispatch({ type: 'SET_CURRENT_PAGE', payload: currentPageName });
  }, [currentLocation.pathname, dispatch]);

  useEffect(() => {
    if (userName) {
      votesStore.setSubId = userName;
      favouritesStore.setSubId = userName;
      galleryStore.setSubId = userName;
    }
  }, [userName]);

  useEffect(() => {
    const allErrors = [];
    allErrors.push(breedsStore.getErrors);
    allErrors.push(galleryStore.getErrors);
    allErrors.push(votesStore.getErrors);
    allErrors.push(favouritesStore.getErrors);
    const filtered = uniq(allErrors.flat());
    filtered.forEach((message) => toast.error(message));
  }, []);

  return (
    <div className={mainClass}>
      <Media
        queries={{
          pc: '(min-width: 1200px)',
        }}
      >
        {(matches) => (
          <Routes>
            <Route
              path="/"
              element={matches.pc ? <PCLayout /> : <TabletLayout />}
            >
              <Route index element={matches.pc ? <Home /> : <StartPage />} />
              <Route element={<MainComponent />}>
                <Route path="votes" element={<Votes />} />
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
