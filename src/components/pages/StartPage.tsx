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
            <div className="main-titles">
              <h1>Welcome to CatHub ocean!</h1>
              <h2>Enjoy!</h2>
            </div>
            <div>
              <Navigation />
            </div>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default StartPage;
