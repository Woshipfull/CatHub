import { Link, useNavigate } from 'react-router-dom';

import { useContext } from 'react';

import { RiLogoutCircleLine } from 'react-icons/ri';
import { HiHeart } from 'react-icons/hi';
import { GlobalStore } from '../../stores/GlobalStore';

type NavItem = {
  imgSrc: string;
  href: string;
  btn: string;
};

type NavItemsArray = NavItem[];

type NavProps = {
  setShowMenu?: (arg: boolean) => void;
};

const navItemsArray: NavItemsArray = [
  { imgSrc: '/images/images-search.png', href: 'gallery', btn: 'gallery' },
  { imgSrc: '/images/pet-breeds.png', href: 'breeds', btn: 'breeds' },
  { imgSrc: '/images/vote-table.png', href: 'votes', btn: 'my votes' },
];

const Navigation: React.FC<NavProps> = ({ setShowMenu }) => {
  const navigate = useNavigate();
  const { state } = useContext(GlobalStore);

  const { userName } = window.localStorage;

  const handleLogout = () => {
    window.localStorage.clear();
    navigate('/');
  };

  const handleClose = () => {
    if (setShowMenu) {
      setShowMenu(false);
    }
  };

  return (
    <div className="navigation">
      <div className="user-row">
        <div className="username">
          <span>{userName}</span>
        </div>
        <div className="user-btns">
          <Link to="favourites" onClick={handleClose}>
            <button type="button" className="btn btn-dark sm-btn">
              <div className="btn-icon">
                <HiHeart />
              </div>
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-light sm-btn"
            onClick={handleLogout}
          >
            <div className="btn-icon">
              <RiLogoutCircleLine />
            </div>
          </button>
        </div>
      </div>
      <div className="page-links">
        {navItemsArray.map((item: NavItem) => {
          const btnClass =
            state.currentPage === item.href ? 'nav-card active' : 'nav-card';

          return (
            <Link
              key={item.href}
              to={item.href}
              className={btnClass}
              onClick={handleClose}
            >
              <div className="nav-image">
                <img src={item.imgSrc} alt={item.href} />
              </div>
              <div className="nav-btn">{item.btn}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
