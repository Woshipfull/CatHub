import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { IoChevronBack } from 'react-icons/io5';
import { HiHeart } from 'react-icons/hi';
import {
  BsEmojiSmile,
  BsEmojiFrown,
  BsClockHistory,
  BsDashCircleDotted,
} from 'react-icons/bs';

import votesStore from '../../stores/VotesStore';
import favouritesStore from '../../stores/FavouritesStore';
import { VotesColl } from '../../stores/storesTypes';
import NoItemFound from '../parts/NoItemFound';

type ControlBTN = {
  name: string;
  icon: JSX.Element;
};

type VotesControls = Array<ControlBTN>;

const votesControls: VotesControls = [
  { name: 'liked', icon: <BsEmojiSmile /> },
  { name: 'disliked', icon: <BsEmojiFrown /> },
  { name: 'history', icon: <BsClockHistory /> },
];

const Votes = observer(() => {
  const navigate = useNavigate();
  const { isInFavourites } = favouritesStore;
  const [showEntitie, setShowEntitie] = useState('all');

  const handleChangeShowEntitie = (newValue: string) => () => {
    if (newValue === showEntitie) {
      setShowEntitie('all');
      return;
    }
    setShowEntitie(newValue);
  };

  const renderVotesControls = (array: VotesControls) =>
    array.map(({ name, icon }) => {
      const btnClass =
        showEntitie === name
          ? 'btn sm-btn btn-dark active'
          : 'btn sm-btn btn-dark';
      return (
        <button
          key={name}
          type="button"
          className={btnClass}
          onClick={handleChangeShowEntitie(name)}
        >
          <div className="btn-icon">{icon}</div>
        </button>
      );
    });

  const doesEntityRender = (name: string) =>
    name === showEntitie || showEntitie === 'all';

  const renderGalleryContent = (array: VotesColl, btn: string) => (
    <div className="gallery" key={`gallery-${btn}`}>
      {array.map(({ id, image }) => (
        <div key={id} className="gallery-item">
          <div className="overlay">
            <div className="vote-btns">
              <div className="like-dislike">
                <button type="button" className="btn sm-btn btn-light active">
                  <div className="btn-icon">
                    {btn === 'liked' && <BsEmojiSmile />}
                    {btn === 'disliked' && <BsEmojiFrown />}
                  </div>
                </button>
                <button
                  type="button"
                  className={`btn sm-btn btn-light ${
                    isInFavourites(image.id) && 'active'
                  }`}
                >
                  <div className="btn-icon heart-icon">
                    <HiHeart />
                  </div>
                </button>
              </div>
            </div>
          </div>
          <img src={image.url} alt={image.id} />
        </div>
      ))}
    </div>
  );

  const renderLiked = () => {
    if (!doesEntityRender('liked')) {
      return null;
    }
    return (
      <div className="votes-item">
        <div className="votes-item-title">Liked</div>
        <div className="gallery-container">
          {votesStore.getLiked.length > 0 ? (
            renderGalleryContent(votesStore.getLiked, 'liked')
          ) : (
            <NoItemFound message="You haven't added any cats to Liked!" />
          )}
        </div>
      </div>
    );
  };

  const renderDisliked = () => {
    if (!doesEntityRender('disliked')) {
      return null;
    }
    return (
      <div className="votes-item">
        <div className="votes-item-title">Disliked</div>
        <div className="gallery-container">
          {votesStore.getDisliked.length > 0 ? (
            renderGalleryContent(votesStore.getDisliked, 'disliked')
          ) : (
            <NoItemFound message="You haven't added any cats to Disliked!" />
          )}
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    if (!doesEntityRender('history')) {
      return null;
    }
    return (
      <div className="votes-item">
        <div className="votes-item-title">History</div>
        {votesStore.getHistory.map((item) => {
          const dateObj = new Date(item.createdAt);
          const day = dateObj.toDateString().split(' ').slice(1, 3).join(' ');
          const time = dateObj.toTimeString().split(':').slice(0, 2).join(':');
          const action = item.result.action.split(' ')[1];
          const isRemoved = action === 'removed';
          const iconColorClass = isRemoved ? 'removed' : item.result.fromTo;
          return (
            <div className="history-card" key={item.id}>
              <div className="history-date-container">
                <div className="history-date">
                  <div>{dateObj.getFullYear()}</div>
                  <div>{day}</div>
                  <div>{time}</div>
                </div>
              </div>
              <div className="history-text">
                <p>
                  Image ID:&nbsp;
                  <span className="img-id">{item.image.id}</span>
                  {` ${item.result.action} ${item.result.fromTo}`}
                </p>
              </div>
              <div className={`history-icon ${iconColorClass}`}>
                {isRemoved && <BsDashCircleDotted />}
                {iconColorClass === 'Likes' && <BsEmojiSmile />}
                {iconColorClass === 'Dislikes' && <BsEmojiFrown />}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderEntities = () => {
    if (votesStore.getHistory.length === 0) {
      return <NoItemFound message="You haven't voted for any cats yet!" link />;
    }
    return (
      <>
        {renderLiked()}
        {renderDisliked()}
        {renderHistory()}
      </>
    );
  };

  return (
    <>
      <div className="controls">
        <div className="breadcrumb">
          <button
            type="button"
            className="btn sm-btn btn-back btn-dark"
            onClick={() => navigate(-1)}
          >
            <div className="btn-icon">
              <IoChevronBack />
            </div>
          </button>
          <div className="page-label">my votes</div>
        </div>
        <div className="votes-controls">
          {renderVotesControls(votesControls)}
        </div>
      </div>
      <div className="scroll-content">
        <div className="votes-content">{renderEntities()}</div>
      </div>
    </>
  );
});

export default Votes;
