// import { FaCat } from 'react-icons/fa';
import { useState } from 'react';
import { RiLoginCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [text, setText] = useState('');
  const [isValidText, setIsValidText] = useState(true);

  const navigate = useNavigate();

  const inputClass = isValidText ? 'login-input' : 'login-input is-invalid';

  const handleInputText = (e: { target: { value: string } }) =>
    setText(e.target.value);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (text === '') {
      setIsValidText(false);
      return;
    }
    window.localStorage.setItem('userName', text);
    navigate('/');
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          type="text"
          className={inputClass}
          placeholder="CatLover123"
          value={text}
          onChange={handleInputText}
          onAnimationEnd={() => setIsValidText(true)}
        />
        <button className="login-btn" type="submit">
          <div className="btn-icon">
            <RiLoginCircleLine />
          </div>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
