/* global window */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Pokemon from './Pokemon';
import PokemonForm from './PokemonForm';
import PokemonList from './PokemonList';
import { success } from '../helpers/notifications';
import { handleAjaxError } from '../helpers/helpers';

const Editor = () => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/pokemon.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addPokemon = async (newPokemon) => {
    try {
      const response = await window.fetch('/api/pokemon.json', {
        method: 'POST',
        body: JSON.stringify(newPokemon),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw Error(response.statusText);

      const savedPokemon = await response.json();
      const newPokemon = [...pokemon, savedPokemon];
      setPokemon(newPokemon);
      success('Pokemon Added!');
      navigate(`/pokemon/${savedPokemon.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const updatePokemon = async (updatedPokemon) => {
    try {
      const response = await window.fetch(
        `/api/pokemon/${updatedPokemon.id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(updatedPokemon),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const newPokemon = pokemon;
      const idx = newPokemon.findIndex((pmon) => pmon.id === updatedPokemon.id);
      newPokemon[idx] = updatedPokemon;
      setPokemon(newPokemon);

      success('Pokemon Updated!');
      navigate(`/pokemon/${updatedPokemon.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <Header />
      {isLoading ? (
        <p className='loading'>Loading...</p>
      ) : (
        <div className="grid">
          <PokemonList pokemon={pokemon} />

          <Routes>
            <Route
              path=":id"
              element={<Pokemon pokemon={pokemon}/>}
            />
            <Route
              path=":id/edit"
              element={<PokemonForm pokemon={pokemon} onSave={updatePokemon} />}
            />
            <Route path="new" element={<PokemonForm onSave={addPokemon()} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Editor;
