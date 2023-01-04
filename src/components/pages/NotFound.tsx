import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <div className="not-found-content">
      <div className="not-found-img">
        <img src="/images/404.png" alt="not found" />
      </div>
      <div className="not-found-message">
        <div>Sorry!</div>
        <div>This page didn&apos;t found.</div>
        <div className="home-link">
          <Link to="/">Go to start page!</Link>
        </div>
      </div>
    </div>
  </div>
);
export default NotFound;
