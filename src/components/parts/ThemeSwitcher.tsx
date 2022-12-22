import { useContext } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { GlobalStore } from '../../stores/GlobalStore';

const ThemeSwitcher = () => {
  const { state, dispatch } = useContext(GlobalStore);
  const { theme } = state;

  // console.log(state);

  const handleChangeTheme = () =>
    dispatch({ type: 'CHANGE_THEME' });

  return (
    <div className="theme-swither">
      <div className="theme-icon" onClick={handleChangeTheme}>
        {theme === 'light' ? <FiSun /> : <FiMoon />}
      </div>
      <form>
        <label className="switch" htmlFor="themeSwitcher">
          <input id="themeSwitcher" type="checkbox" checked={theme === 'dark'} onChange={handleChangeTheme}/>
          <span className="slider round" />
        </label>
      </form>
    </div>
  );
};

export default ThemeSwitcher;
