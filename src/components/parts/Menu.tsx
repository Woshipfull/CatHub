import { IoMdClose } from 'react-icons/io';
import Navigation from './Navigation';
import ThemeSwitcher from './ThemeSwitcher';

const Menu = ({ show, setShow }) => {
  const menuClass = show ? 'menu' : 'menu hidden';
  return (
    <div className={menuClass}>
      <div className="menu-container">
        <div className="menu-upline">
          <ThemeSwitcher />
          <button
            type="button"
            className="btn btn-dark btn-sort sm-btn"
            onClick={() => setShow(!show)}
          >
            <div className="btn-icon">
              <IoMdClose />
            </div>
          </button>
        </div>
        <Navigation setShowMenu={setShow} />
      </div>
    </div>
  );
};

export default Menu;
