import { useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import Logo from './Logo';
import Menu from './Menu';

const Bar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bar">
      <Logo />
      <button type="button" className="btn sm-btn btn-light menu-btn large-btn-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className="btn-icon">
          <IoMenuOutline />
        </div>
      </button>
      <Menu show={showMenu} setShow={setShowMenu} />
    </div>
  );
};

export default Bar;
