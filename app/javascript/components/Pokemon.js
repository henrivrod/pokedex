import React from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import PokemonNotFound from './PokemonNotFound';

const Pokemon = ({ pokemon, onDelete }) => {
  const { id } = useParams();
  const pmon = pokemon.find((e) => e.id === Number(id));

  if (!pmon) return <PokemonNotFound />;

  return (
    <div className="eventContainer">
      <h2>
        {pmon.name}
        {' - '}
        {pmon.image_url}
        <Link to={`/pokemon/${pmon.id}/edit`}>Edit</Link>
      </h2>
    </div>
  );
};

Pokemon.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      types: PropTypes.array.isRequired
    })
  ).isRequired,
};

export default Pokemon;
