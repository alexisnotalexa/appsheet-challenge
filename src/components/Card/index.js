import React from 'react';
import './styles.css';

const Card = ({ age, bio, name, number, photo }) => {
  return (
    <div className="card">
      <img className="card__image" src={photo} />
      <div className="card__container">
        <span className="card__title">{name}</span>
        <div className="card__content">
          <div className="card__content--section">
            <span className="card__content--label">Phone Number</span>
            <span>{number}</span>
          </div>
          <div className="card__content--section">
            <span className="card__content--label">Age</span>
            <span>{age}</span>
          </div>
        </div>
        <button className="card__btn">Read Bio</button>
      </div>
    </div>
  );
}

export default Card;