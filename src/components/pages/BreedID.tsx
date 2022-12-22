import { IoChevronBack } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';

import NoItemFound from '../parts/NoItemFound';

import breedsStore from '../../stores/BreedsStore';

const BreedsId = () => {
  const { breedId } = useParams();
  const navigate = useNavigate();

  const data = breedsStore.getBreedById(breedId);

  const renderContent = () => {
    if (data === undefined) {
      return <NoItemFound />;
    }
    return (
      <div className="breed-id-content">
        <div className="picture">
          <img src={data.image.url} alt={data.name} />
        </div>
        <div className="info">
          <div className="title">
            <h1>{data.name}</h1>
          </div>
          <div className="box">
            <div className="description">{data.description}</div>
            <div className="stats">
              <div className="col-l">
                <div className="option">
                  <span>Temperament:&nbsp;</span>
                  <span>{data.temperament}</span>
                </div>
              </div>
              <div className="col-r">
                <div className="option">
                  <span>Origin:&nbsp;</span>
                  <span>{data.origin}</span>
                </div>

                <div className="option">
                  <span>Weight:&nbsp;</span>
                  <span>{`${data.weight.metric} kgs`}</span>
                </div>

                <div className="option">
                  <span>Life span:&nbsp;</span>
                  <span>{`${data.life_span} years`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
          <div className="page-label">{breedId}</div>
        </div>
      </div>

      <div className="scroll-content">{renderContent()}</div>
    </>
  );
};

export default BreedsId;
