import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, Link } from 'react-router-dom';

import { IoChevronBack } from 'react-icons/io5';
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from 'react-icons/ai';
import { BsFillCaretDownFill } from 'react-icons/bs';

import breedsStore from '../../stores/BreedsStore';

import { AllBreedsForSelect, BreedsColl } from '../../stores/storesTypes';

import Pagination from '../parts/Pagination';
import Spinner from '../parts/Spinner';

const Breeds = observer(() => {
  const navigate = useNavigate();
  const contentRef = useRef(document.createElement('div'));

  const changeLimits = (e: { target: { value: string } }) => {
    breedsStore.setLimit = +e.target.value;
  };

  const changeBreed = (e: { target: { value: string } }) => {
    breedsStore.setBreedFilter = e.target.value;
  };

  const addFilter = (value: string) => () => {
    if (value === breedsStore.getSortBy) {
      breedsStore.setSortBy = 'default';
      return;
    }
    breedsStore.setSortBy = value;
  };

  const sortBtnClass = (val: string) =>
    breedsStore.getSortBy === val
      ? 'btn sm-btn btn-primary active'
      : 'btn btn-primary sm-btn';

  const renderBreedsSelect = (array: AllBreedsForSelect) =>
    array.map(({ id, name }) => (
      <option key={id} value={name}>
        {name}
      </option>
    ));

  const renderBreedsContent = (array: BreedsColl) => {
    const iterrations = Math.ceil(array.length / 5);
    const result = [];
    for (let i = 1; i <= iterrations; i += 1) {
      const end = 5 * i;
      const start = end - 5;
      const items = array.slice(start, end);
      const containerClass = i % 2 === 1 ? 'grid-1' : 'grid-2';

      const gallery = (
        <div className={`gallery ${containerClass}`} key={`gallery-${i}`}>
          {items.map((item) => (
            <div key={item.id} className="gallery-item">
              <div className="overlay">
                <Link className="title" to={item.id}>
                  {`${item.name}-${item.id}`}
                </Link>
              </div>
              <img src={item.image.url} alt={item.name} />
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
          <div className="page-label">Breeds</div>
        </div>

        <div className="breeds-controls">
          <div className="breeds-select">
            <div className="select">
              <div className="select-input">
                <select
                  name="breeds"
                  value={breedsStore.getBreedFilter}
                  onChange={changeBreed}
                >
                  <option value="all">All breeds</option>
                  {renderBreedsSelect(breedsStore.getBreeds)}
                </select>
                <div className="select-icon">
                  <BsFillCaretDownFill />
                </div>
              </div>
            </div>
          </div>
          <div className="limits_sorts">
            <div className="select">
              <div className="select-input">
                <select
                  name="limits"
                  value={breedsStore.getLimit}
                  onChange={changeLimits}
                >
                  <option value="5">Limit: 5</option>
                  <option value="10">Limit: 10</option>
                  <option value="15">Limit: 15</option>
                  <option value="20">Limit: 20</option>
                </select>
                <div className="select-icon">
                  <BsFillCaretDownFill />
                </div>
              </div>
            </div>
            <div className="sort-btns-container">
              <button
                type="button"
                className={sortBtnClass('az')}
                onClick={addFilter('az')}
              >
                <div className="btn-icon">
                  <AiOutlineSortAscending />
                </div>
              </button>
              <button
                type="button"
                className={sortBtnClass('za')}
                onClick={addFilter('za')}
              >
                <div className="btn-icon">
                  <AiOutlineSortDescending />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-content" ref={contentRef}>
        {!breedsStore.isLoaded && <Spinner />}
        {breedsStore.isLoaded && (
          <>
            <div className="gallery-container">
              {renderBreedsContent(breedsStore.getBreedsContent)}
            </div>
            <Pagination
              getPage={breedsStore.getCurrentPage}
              setPage={breedsStore.setCurrentPage}
              maxPage={breedsStore.getMaxPage}
              contentRef={contentRef}
            />
          </>
        )}
      </div>
    </>
  );
});

export default Breeds;
