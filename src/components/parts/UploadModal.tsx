import { useContext, useState } from 'react';
import Media from 'react-media';
import { createPortal } from 'react-dom';
import cn from 'classnames';

import { FileUploader } from 'react-drag-drop-files';
import { BiUpload } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { CgCheckO, CgCloseO } from 'react-icons/cg';

import { observer } from 'mobx-react-lite';
import galleryStore from '../../stores/GalleryStore';
import { GlobalStore } from '../../stores/GlobalStore';

const fileTypes = ['JPG', 'PNG', 'JPEG'];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appRoot = document.getElementById('root')!;

const UploadModal = observer(() => {
  const { state } = useContext(GlobalStore);

  const uploadState = galleryStore.getUploadState;
  const file = galleryStore.getFile;

  const [showModal, setShowModal] = useState(false);

  const modalClass = cn('upload-modal', {
    dark: state.theme === 'dark',
    hide: !showModal,
    show: showModal,
  });

  const statusClass = galleryStore.getUploadState === 'failed' && 'failed';

  const handleChange = (fileData: File) => {
    galleryStore.setFile = fileData;
  };

  const handleShowModal = (arg: boolean) => () => {
    setShowModal(arg);
  };

  const handleSendPhoto = () => {
    galleryStore.uploadPhoto();
  };

  const renderUploadStatus = () => {
    switch (uploadState) {
      case 'waiting':
        return (
          <button
            type="button"
            className="upload-btn btn-dark"
            onClick={handleSendPhoto}
          >
            Upload photo
          </button>
        );
      case 'sending':
        return (
          <div className="upload-spinner">
            <div className="lds-ellipsis">
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="status-message">
            <CgCheckO className="svg-success" />
            <p>Thanks for the Upload - Cat found!</p>
          </div>
        );
      case 'failed':
        return (
          <div className="status-message">
            <CgCloseO className="svg-failed" />
            <p>No Cat found - try a different one</p>
          </div>
        );
      default:
        console.log('UNKNOWN UPLOAD STATE');
        return null;
    }
  };

  return (
    <>
      <button
        type="button"
        className="upload-btn btn-dark"
        onClick={handleShowModal(true)}
      >
        <div className="btn-icon">
          <BiUpload />
        </div>
        Upload
      </button>
      {createPortal(
        <div className={modalClass}>
          <Media
            queries={{
              pc: '(min-width: 1200px)',
            }}
          >
            {(matches) => (
              <>
                {matches.pc ? <div className="window" /> : null}
                <div className="window upload">
                  <div className="content">
                    <div className="scroll-content">
                      <div className="upload-content">
                        <div className="upload-close">
                          <button
                            type="button"
                            className="btn btn-dark sm-btn"
                            onClick={handleShowModal(false)}
                          >
                            <div className="btn-icon">
                              <IoMdClose />
                            </div>
                          </button>
                        </div>
                        <div className="upload-text-container">
                          <div className="upload-title">
                            Upload a .jpg or .png Cat Image
                          </div>
                          <div className="upload-description">
                            Any uploads must comply with the&nbsp;
                            <a
                              href="https://thecatapi.com/privacy"
                              target="_blank"
                              rel="noreferrer"
                            >
                              upload guidelines
                            </a>
                            &nbsp;or face deletion.
                          </div>
                        </div>

                        <FileUploader
                          handleChange={handleChange}
                          name="file"
                          types={fileTypes}
                        >
                          <div className={`upload-input ${statusClass}`}>
                            {!file && (
                              <>
                                <img
                                  src="/images/upload-bg.png"
                                  alt=""
                                  className="upload-default-img"
                                />
                                <div className="upload-input-label">
                                  <div>
                                    Drag here&nbsp;
                                    <span>your file or</span>
                                  </div>
                                  <div>
                                    &nbsp;Click here&nbsp;
                                    <span>to upload</span>
                                  </div>
                                </div>
                              </>
                            )}

                            {file && (
                              <div className="user-img">
                                <img src={URL.createObjectURL(file)} alt="" />
                              </div>
                            )}
                          </div>
                        </FileUploader>
                        <div className="file-name">
                          {file
                            ? `Image File Name: ${file.name}`
                            : 'No file selected'}
                        </div>
                        {file && (
                          <div className="upload-status">
                            {renderUploadStatus()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Media>
        </div>,
        appRoot,
      )}
    </>
  );
});

export default UploadModal;
