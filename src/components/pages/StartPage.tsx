import Logo from '../parts/Logo';
import Navigation from '../parts/Navigation';
import ThemeSwitcher from '../parts/ThemeSwitcher';
import LoginForm from '../parts/LoginForm';

const StartPage = () => {
  const { userName } = window.localStorage;

  return (
    <div className="start-page-container">
      <div className="start-page">
        <div className="logo-header">
          <Logo />
          <ThemeSwitcher />
        </div>
        {userName ? (
          <>
            <div className="welcome">
              <h1>
                Welcome to
                <span> CatHub </span>
                ocean!
              </h1>
            </div>
            <div>
              <Navigation />
            </div>
          </>
        ) : (
          <>
            <div className="welcome">
              <h1>
                <span> Hello! </span>
              </h1>
              <h1>To get started, enter your nickname:</h1>
            </div>
            <LoginForm />
          </>
        )}
      </div>
    </div>
  );
};

export default StartPage;
