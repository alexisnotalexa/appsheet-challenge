import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header>
      <span class="fa-layers fa-fw">
        <i class="fas fa-circle fa-4x"></i>
        <i class="fa-inverse fab fa-telegram-plane fa-3x" data-fa-transform="rotate-30"></i>
      </span>
    </header>
  );
}

export default Header;