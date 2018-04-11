import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header>
      <span class="fa-layers fa-fw">
        <i class="fas fa-circle fa-3x"></i>
        <i class="fa-inverse fab fa-telegram-plane fa-4x" data-fa-transform="rotate-30 left-3 up-1"></i>
      </span>
    </header>
  );
}

export default Header;