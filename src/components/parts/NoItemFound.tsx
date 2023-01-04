import { Link } from 'react-router-dom';

type Props = {
  message: string;
  link?: boolean;
};

const NoItemFound: React.FC<Props> = ({ message, link }) => (
  <div className="no-item">
    {message}
    {link && (
      <div className="link">
        <Link to="/gallery">
          Go to
          <span> GALLERY!</span>
        </Link>
      </div>
    )}
  </div>
);

export default NoItemFound;
