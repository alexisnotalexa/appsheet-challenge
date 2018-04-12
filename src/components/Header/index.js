import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header>
      <div className="header__bg" />
      <div className="header__circle">
        <i class="fa-inverse fab fa-telegram-plane fa-2x"></i>
      </div>
    </header>
  );
}

export default Header;