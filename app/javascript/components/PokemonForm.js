import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import PokemonNotFound from './PokemonNotFound';
//import { formatDate, isEmptyObject, validateEvent } from '../helpers/helpers';

import 'pikaday/css/pikaday.css';

const PokemonForm = ({ pokemon, onSave }) => {
  const { id } = useParams();

  const initialPokemonState = useCallback(
    () => {
      const defaults = {
        name: '',
        image_url: '',
      };
      const currPokemon = id ? pokemon.find((e) => e.id === Number(id)) : {};
      return { ...defaults, ...currPokemon }
    },
    [pokemon, id]
  );

  const [pmon, setPokemon] = useState(initialPokemonState);
  const [formErrors, setFormErrors] = useState({});
  //const dateInput = useRef(null);

  const updatePokemon = (key, value) => {
    setPokemon((prevPokemon) => ({ ...prevPokemon, [key]: value }));
  };

  /*useEffect(() => {
    const p = new Pikaday({
      field: dateInput.current,
      toString: date => formatDate(date),
      onSelect: (date) => {
        const formattedDate = formatDate(date);
        dateInput.current.value = formattedDate;
        updateEvent('event_date', formattedDate);
      },
    });

    // Return a cleanup function.
    // React will call this prior to unmounting.
    return () => p.destroy();
  }, []);*/

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    updatePokemon(name, value);
  };

  useEffect(() => {
    setPokemon(initialPokemonState());
  }, [pokemon, initialPokemonState()]);

  const renderErrors = () => {
    if (isEmptyObject(formErrors)) return null;

    return (
      <div className="errors">
        <h3>The following errors prohibited the Pokemon from being saved:</h3>
        <ul>
          {Object.values(formErrors).map((formError) => (
            <li key={formError}>{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatePokemon(pmon);

    if (!isEmptyObject(errors)) {
      setFormErrors(errors);
    } else {
      onSave(pmon);
    }
  };

  const cancelURL = pmon.id ? `/pokemon/${pmon.id}` : '/pokemon';
  const title = pmon.id ? `${pmon.name} ` : 'New Pokemon';

  if (id && !pmon.id) return <PokemonNotFound />;

  return (
    <div>
      <h2>{title}</h2>
      {renderErrors()}

      <form className="pokemonForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="event_type"> //change to name?
            <strong>Name:</strong>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={pmon.name}
            />
          </label>
        </div>
        <div>
          <label htmlFor="event_date"> //change to image_url?
            <strong>Image Url:</strong>
            <input
              type="text"
              id="image_url"
              name="image_url"
              value={pmon.image_url}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit">Save</button>
          <Link to={cancelURL}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default PokemonForm;

PokemonForm.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

PokemonForm.defaultProps = {
  pokemon: [],
};
