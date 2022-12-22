import { useState } from 'react';
import { BiUpload } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import Media from 'react-media';

const UploadModal = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  const modalClass = showUploadModal ? 'upload-modal show' : 'upload-modal';

  return (
    <>
      <button
        type="button"
        className="upload-btn btn-dark"
        onClick={() => setShowUploadModal(!showUploadModal)}
      >
        <div className="btn-icon">
          <BiUpload />
        </div>
        Upload
      </button>
      <div className={modalClass}>
        <Media
          queries={{
            pc: '(min-width: 1200px)',
          }}
        >
          {(matches) => (
            <div className="layout">
              {matches.pc ? <div className="window" /> : null}
              <div className="window">
                <div className="content">
                  <button
                    type="button"
                    className="btn btn-dark btn-sort sm-btn"
                    onClick={() => setShowUploadModal(!showUploadModal)}
                  >
                    <div className="btn-icon">
                      <IoMdClose />
                    </div>
                  </button>
                  <div>UPLOAD CONTENT</div>
                </div>
              </div>
            </div>
          )}
        </Media>
      </div>
    </>
  );
};

export default UploadModal;
