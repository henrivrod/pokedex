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
  const [types, setTypes] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/pokemon.json');
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        setPokemon(data["results"]);
        setTypes(data["types"])
      } catch (error) {
        handleAjaxError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const addPokemon = async (newPmon) => {
    try {
      const response = await window.fetch('/api/pokemon.json', {
        method: 'POST',
        body: JSON.stringify(newPmon),
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
      navigate(`/pokemon/`);
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

      const savedPokemon = await response.json();
      const newPokemon = pokemon;
      const idx = newPokemon.findIndex((pmon) => pmon.id === updatedPokemon.id);
      newPokemon[idx] = savedPokemon;
      setPokemon(newPokemon);

      success('Pokemon Updated!');
      navigate(`/pokemon/`);
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
              element={<PokemonForm pokemon={pokemon} types={types} onSave={updatePokemon} />}
            />
            <Route path="new" element={<PokemonForm types={types} onSave={addPokemon} />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default Editor;
