import { useState } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const Pagination = ({ getPage, setPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (e) => console.log(e.target.value);

  const renderLargePagination = () => {
    if (currentPage < 6) {
      return;
    }
  };
  return (
    <div className="pagination">
      <div className="btn sm-btn btn-dark">
        <span>
          <IoChevronBack />
        </span>
      </div>

      {/* TAB & DESKTOP */}
      <button
        type="button"
        className="btn btn-sort btn-primary sm-btn"
        value={1}
        onClick={handleChangePage}
      >
        <span>1</span>
      </button>
      <div className="btn btn-sort btn-primary sm-btn">
        <span>2</span>
      </div>
      <div className="btn btn-sort btn-primary sm-btn disabled">
        <span>...</span>
      </div>
      <button type="button" className="btn btn-sort btn-primary sm-btn">
        <span>5</span>
      </button>
      <div className="btn btn-sort btn-primary sm-btn active">
        <span>6</span>
      </div>
      <div className="btn btn-sort btn-primary sm-btn">
        <span>7</span>
      </div>
      <div className="btn btn-sort btn-primary sm-btn disabled">
        <span>...</span>
      </div>
      <div className="btn btn-sort btn-primary sm-btn">
        <span>19</span>
      </div>
      <div className="btn btn-sort btn-primary sm-btn">
        <span>20</span>
      </div>

      {/* MOBILE */}
      {/* <div className="btn btn-sort btn-primary sm-btn">
      <span>4</span>
    </div>
    <div className="btn btn-sort btn-primary sm-btn active">
      <span>5</span>
    </div>
    <div className="btn btn-sort btn-primary sm-btn">
      <span>6</span>
    </div> */}

      <div className="btn sm-btn btn-dark">
        <span>
          <IoChevronForward />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
