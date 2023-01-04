/* eslint-disable @typescript-eslint/comma-dangle */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { IoChevronBack } from 'react-icons/io5';
import { AiOutlineReload } from 'react-icons/ai';
import { HiHeart } from 'react-icons/hi';
import { BsEmojiSmile, BsEmojiFrown } from 'react-icons/bs';

import galleryStore from '../../stores/GalleryStore';
import breedsStore from '../../stores/BreedsStore';
import votesStore from '../../stores/VotesStore';
import favouritesStore from '../../stores/FavouritesStore';
import { AllBreedsForSelect, GalleryColl } from '../../stores/storesTypes';

import UploadModal from '../parts/UploadModal';
import Pagination from '../parts/Pagination';

const Gallery = observer(() => {
  const { wasLiked, wasDisliked } = votesStore;
  const { isInFavourites } = favouritesStore;
  const navigate = useNavigate();

  const [filterState, setFilterState] = useState(
    galleryStore.getGalleryFilterState
  );

  const changeSelect = (e: { target: { name: string; value: string } }) => {
    const stateKey = e.target.name;
    const newValue = e.target.value;
    setFilterState({ ...filterState, [stateKey]: newValue });
  };

  const applyNewFilters = () => {
    galleryStore.setGalleryFilterState = filterState;
  };

  const renderGalleryContent = (array: GalleryColl) => {
    const iterrations = Math.ceil(array.length / 5);
    const result = [];
    for (let i = 1; i <= iterrations; i += 1) {
      const end = 5 * i;
      const start = end - 5;
      const items = array.slice(start, end);
      const containerClass = i % 2 === 1 ? 'grid-1' : 'grid-2';

      const gallery = (
        <div className={`gallery ${containerClass}`} key={`gallery-${i}`}>
          {items.map(({ id, url }) => (
            <div key={id} className="gallery-item">
              <div className="overlay">
                <div className="vote-btns">
                  <div className="like-dislike">
                    <button
                      type="button"
                      className={`btn sm-btn btn-light ${
                        wasLiked(id) && 'active'
                      }`}
                    >
                      <div className="btn-icon">
                        <BsEmojiSmile />
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`btn sm-btn btn-light ${
                        wasDisliked(id) && 'active'
                      }`}
                    >
                      <div className="btn-icon">
                        <BsEmojiFrown />
                      </div>
                    </button>
                  </div>
                  <div className="favourite">
                    <button
                      type="button"
                      className={`btn sm-btn btn-light ${
                        isInFavourites(id) && 'active'
                      }`}
                    >
                      <div className="btn-icon heart-icon">
                        <HiHeart />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <img src={url} alt={id} />
            </div>
          ))}
        </div>
      );

      result.push(gallery);
    }

    return result;
  };

  const renderBreedsSelect = (array: AllBreedsForSelect) =>
    array.map(({ id, name }) => (
      <option key={id} value={name}>
        {name}
      </option>
    ));

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
          <div className="page-label">GALLERY</div>
        </div>
        <UploadModal />
      </div>

      <div className="scroll-content">
        <div className="gallery-content">
          <div className="gallery-filters">
            <div className="filters-col">
              <div className="select secondary">
                <div className="label">order</div>
                <select
                  name="order"
                  id="gallery-order"
                  value={filterState.order}
                  onChange={changeSelect}
                >
                  <option value="random">Random</option>
                  <option value="decs">Desc</option>
                  <option value="asc">Asc</option>
                </select>
              </div>
              <div className="select secondary">
                <div className="label">breed</div>
                <select
                  name="breed"
                  id="gallery-breed"
                  value={filterState.breed}
                  onChange={changeSelect}
                >
                  <option value="none">None</option>
                  {renderBreedsSelect(breedsStore.getBreeds)}
                </select>
              </div>
            </div>
            <div className="filters-col">
              <div className="select secondary">
                <div className="label">Type</div>
                <select
                  name="type"
                  id="gallery-type"
                  value={filterState.type}
                  onChange={changeSelect}
                >
                  <option value="all">All</option>
                  <option value="static">Static</option>
                  <option value="animated">Animated</option>
                </select>
              </div>
              <div className="last-filters">
                <div className="select secondary">
                  <div className="label">limit</div>
                  <select
                    name="limit"
                    id="gallery-limit"
                    value={filterState.limit}
                    onChange={changeSelect}
                  >
                    <option value="5">5 items per page</option>
                    <option value="10">10 items per page</option>
                    <option value="15">15 items per page</option>
                    <option value="20">20 items per page</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="btn btn-light btn-sort sm-btn"
                  onClick={applyNewFilters}
                >
                  <div className="btn-icon">
                    <AiOutlineReload />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="gallery-container">
            {renderGalleryContent(galleryStore.getGalleryContent)}
          </div>
        </div>

        <Pagination getPage="" setPage="" />
      </div>
    </>
  );
});

export default Gallery;
