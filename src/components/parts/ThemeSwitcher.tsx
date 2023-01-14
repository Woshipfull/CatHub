import { useContext } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GlobalStore } from '../../stores/GlobalStore';

const ThemeSwitcher = () => {
  const { state, dispatch } = useContext(GlobalStore);

  const handleChangeTheme = () => {
    dispatch({
      type: 'CHANGE_THEME',
      payload: '',
    });
  };

  return (
    <div className="theme-swither">
      <button type="button" className="theme-icon" onClick={handleChangeTheme}>
        {state.theme === 'light' ? <FiSun /> : <FiMoon />}
      </button>
      <form>
        <label className="switch" htmlFor="themeSwitcher">
          <input
            id="themeSwitcher"
            type="checkbox"
            checked={state.theme === 'dark'}
            onChange={handleChangeTheme}
          />
          <span className="slider round" />
        </label>
      </form>
    </div>
  );
};

export default ThemeSwitcher;
