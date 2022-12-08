import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to='/pokemon/'>
      <h1>Pokedex</h1>
    </Link>
  </header>
);

export default Header;
