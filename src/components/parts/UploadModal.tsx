import { useContext, useState, useEffect } from 'react';
import Media from 'react-media';
import { createPortal } from 'react-dom';

import { FileUploader } from 'react-drag-drop-files';
import { BiUpload } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { CgCheckO, CgCloseO } from 'react-icons/cg';

import galleryStore from '../../stores/GalleryStore';
import { GlobalStore } from '../../stores/GlobalStore';

type UploadStatus = 'notSent' | 'success' | 'failed';

const fileTypes = ['JPG', 'PNG'];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const appRoot = document.getElementById('root')!;

const UploadModal = () => {
  const { state } = useContext(GlobalStore);
  const [showClass, setShowClass] = useState('');
  const [themeClass, setThemeClass] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('notSent');

  const statusClass = uploadStatus === 'failed' && 'failed';

  const handleChange = (fileData: File) => {
    setFile(fileData);
  };

  const handleShowModal = (str: string) => () => {
    setShowClass(str);
  };

  const handleSendPhoto = () => {
    galleryStore.uploadPhoto(file);
  };

  const draggingStateChange = (dragging: boolean) => console.log(dragging);

  const renderUploadStatus = () => (
    <div className="upload-status">
      {uploadStatus === 'notSent' && (
        <button
          type="button"
          className="upload-btn btn-dark"
          onClick={handleSendPhoto}
        >
          Upload photo
        </button>
      )}
      {uploadStatus === 'success' && (
        <div className="status-message">
          <CgCheckO className="svg-success" />
          <p>Thanks for the Upload - Cat found!</p>
        </div>
      )}
      {uploadStatus === 'failed' && (
        <div className="status-message">
          <CgCloseO className="svg-failed" />
          <p>No Cat found - try a different one</p>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (state.theme === 'dark') {
      setThemeClass(state.theme);
    } else {
      setThemeClass('');
    }
  }, [state.theme]);

  return (
    <>
      <button
        type="button"
        className="upload-btn btn-dark"
        onClick={handleShowModal('show')}
      >
        <div className="btn-icon">
          <BiUpload />
        </div>
        Upload
      </button>
      {createPortal(
        <div className={`upload-modal ${showClass} ${themeClass}`}>
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
                            onClick={handleShowModal('hide')}
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
                          onDraggingStateChange={draggingStateChange}
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
                        {file && renderUploadStatus()}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Media>
        </div>,
        appRoot
      )}
    </>
  );
};

export default UploadModal;
