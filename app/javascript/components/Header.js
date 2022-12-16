import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <Link to='/pokemon/'>
      <img className="logo" src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png" alt="pokedex"/>
    </Link>
    <Link to="/pokemon/new">
        <button className="addButton">
            <img className="pokeball" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Pok%C3%A9ball.png"/>
            Add New Pokemon
        </button>
    </Link>

  </header>
);

export default Header;
