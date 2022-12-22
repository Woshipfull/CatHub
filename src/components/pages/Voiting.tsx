import { IoChevronBack } from 'react-icons/io5';

const Voiting = () => {
  const message = "VOITING ISN'T DONE!";
  return (
    <>
      <div className="controls">
        <div className="breadcrumb">
          <button type="button" className="btn sm-btn btn-back btn-dark">
            <div className="btn-icon">
              <IoChevronBack />
            </div>
          </button>
          <div className="page-label">VOITING</div>
        </div>
      </div>
      <div className="scroll-content">{message}</div>
    </>
  );
};

export default Voiting;
