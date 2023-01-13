import { HiHeart } from 'react-icons/hi';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import favouritesStore from '../../stores/FavouritesStore';
import { FavouritesColl } from '../../stores/storesTypes';

import NoItemFound from '../parts/NoItemFound';
import Spinner from '../parts/Spinner';

const Favourites = observer(() => {
  const navigate = useNavigate();

  const renderGalleryContent = (array: FavouritesColl) => {
    const iterrations = Math.ceil(array.length / 5);
    const result = [];
    for (let i = 1; i <= iterrations; i += 1) {
      const end = 5 * i;
      const start = end - 5;
      const items = array.slice(start, end);
      const containerClass = i % 2 === 1 ? 'grid-1' : 'grid-2';

      const gallery = (
        <div className={`gallery ${containerClass}`} key={`gallery-${i}`}>
          {items.map(({ id, image }) => (
            <div key={id} className="gallery-item">
              <div className="overlay">
                <div className="vote-btns">
                  <div className="favourite">
                    <button
                      type="button"
                      className="btn sm-btn btn-light active"
                      onClick={() => favouritesStore.removeFromFavourite(image.id)}
                    >
                      <div className="btn-icon heart-icon">
                        <HiHeart />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <img src={image.url} alt={image.id} />
            </div>
          ))}
        </div>
      );

      result.push(gallery);
    }

    return result;
  };

  return (
    <>
      <div className="controls">
        <div className="breadcrumb">
          <button
            type="button"
            className="btn sm-btn btn-back btn-dark"
            onClick={() => navigate(-1)}
          >
            <div className="btn-icon">
              <IoChevronBack />
            </div>
          </button>
          <div className="page-label">FAVOURITES</div>
        </div>
      </div>
      <div className="scroll-content">
        {!favouritesStore.isLoaded && <Spinner />}
        {favouritesStore.isLoaded && (
          <div className="gallery-container">
            {favouritesStore.getFavourites.length > 0 ? (
              renderGalleryContent(favouritesStore.getFavourites)
            ) : (
              <NoItemFound
                message="You haven't added any cats to Favourites yet!"
                link
              />
            )}
          </div>
        )}
      </div>
    </>
  );
});

export default Favourites;
