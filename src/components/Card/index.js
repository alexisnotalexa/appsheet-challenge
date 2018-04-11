import React from 'react';
import './styles.css';

const Card = ({ age, bio, name, number, photo }) => {
  return (
    <div>
      <h3>Card</h3>
      <span>{age}</span>
      <span>{name}</span>
    </div>
  );
}

export default Card;