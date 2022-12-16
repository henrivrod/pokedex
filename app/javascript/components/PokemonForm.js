import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import PokemonNotFound from './PokemonNotFound';
import {isEmptyObject, validatePokemon} from '../helpers/helpers';

import 'pikaday/css/pikaday.css';

const PokemonForm = ({ pokemon, types, onSave }) => {
  const { id } = useParams();

  const initialPokemonState = useCallback(
    () => {
      const defaults = {
        name: '',
        image_url: '',
        types: [],
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

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;

    if (name==='types'){
      const options = target.options
      let value=[]
      for (let i =0; i<options.length; i++){
        console.log(i)
        if (options[i].selected){
          console.log(options[i].value)
          value.push(options[i].value)
          console.log(value)
        }
      }
      updatePokemon(name, value);
    }
    else{
      let value=target.value
      updatePokemon(name, value);
    }
  };

  useEffect(() => {
    setPokemon(initialPokemonState);
  }, [pokemon, initialPokemonState]);

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

  const title = pmon.id ? `${pmon.name} ` : 'New Pokemon';

  if (id && !pmon.id) return <PokemonNotFound />;

  return (
    <div className="modal">
      <div className="modal_content">
        <h2>{title}</h2>
        {renderErrors()}

        <form className="pokemonForm" onSubmit={handleSubmit}>
          <div>
            <strong>Name:</strong>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              defaultValue={pmon.name}
              required={true}
            />
          </div>
          <div>
            <strong>Image Url:</strong>
            <input
              type="text"
              id="image_url"
              name="image_url"
              defaultValue={pmon.image_url}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <div>
            <strong>Types:</strong>
            <select multiple={true} required={true} defaultValue={pmon.types ? pmon.types.map(t => t.name) : []} id="types" name="types" onChange={handleInputChange}>
              {types.map((type)=>(
                  <option value={type.name}>{type.name}</option>
              ))
              }
            </select>
          </div>
          <div className="form-actions">
            <button type="submit">Save</button>
            <Link to='/pokemon'>Cancel</Link>
          </div>
        </form>
      </div>
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
      types: PropTypes.array.isRequired
    })
  ),
  onSave: PropTypes.func.isRequired
};

PokemonForm.defaultProps = {
  pokemon: [],
};
