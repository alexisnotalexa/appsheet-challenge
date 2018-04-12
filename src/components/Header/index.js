import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header>
      <span class="fa-layers fa-fw fa-4x">
        <i class="fas fa-circle"></i>
        <i class="fa-inverse fab fa-telegram-plane" data-fa-transform="shrink-6 down-.5 left-.5"></i>
      </span>
    </header>
  );
}

export default Header;