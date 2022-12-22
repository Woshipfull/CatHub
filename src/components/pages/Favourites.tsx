import { IoChevronBack } from 'react-icons/io5';

const Favourites = () => (
  <>
    <div className="controls">
      <div className="breadcrumb">
        <button type="button" className="btn sm-btn btn-back btn-dark">
          <div className="btn-icon">
            <IoChevronBack />
          </div>
        </button>
        <div className="page-label">FAVOURITES</div>
      </div>
    </div>
    <div className="scroll-content">FAVOURITES CONTENT</div>
  </>
);

export default Favourites;
