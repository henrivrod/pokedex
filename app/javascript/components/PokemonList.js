import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const PokemonList = ({ pokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchInput = useRef(null);

  const updateSearchTerm = () => {
    setSearchTerm(searchInput.current.value);
  };

  const matchSearchTerm = (obj) => {
    // eslint-disable-next-line camelcase
    const { id, created_at, updated_at, ...rest } = obj;
    return Object.values(rest).some(
      (value) => value.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
  };

  const renderPokemon = (pokemonArray) =>
    pokemonArray
      .filter((el) => matchSearchTerm(el))
      .sort((a, b) => b.id - a.id)
      .map((pmon) => (
        <li key={pmon.id}>
          <NavLink to={`/pokemon/${pmon.id}`}>
            {pmon.name}
          </NavLink>
        </li>
      ));

  return (
    <section className="pokemonlist">
      <h2>
        Pokemon
        <Link to="/pokemon/new">New Pokemon</Link>
      </h2>

      <input
        className="search"
        placeholder="Search"
        type="text"
        ref={searchInput}
        onKeyUp={updateSearchTerm}
      />

      <ul>{renderPokemon(pokemon)}</ul>
    </section>
  );
};

PokemonList.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PokemonList;
