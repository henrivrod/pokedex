import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PokemonList = ({ pokemon }) => {

  const idify = (num) => {
      if (num.length === 1){
          return "#00"+num
      }
      else if (num.length == 2){
          return "#0"+num
      }
      else {
          return "#"+num
      }
  }

  const namify = (name) => {
      if (name.includes("-")){
          name = name.split("-")
          return name[0].charAt(0).toUpperCase() + name[0].slice(1)+ " "
              name[1].charAt(0).toUpperCase() + name[1].slice(1);
      }
      else {
          return name.charAt(0).toUpperCase() + name.slice(1);
      }
  }

  const renderPokemon = (pokemonArray) => {
      {
          let rows=[];
          pokemonArray.forEach((pmon,i) => {
              if (((i+1)%4===0) || i===pokemonArray.length-1){
                  rows.push(
                      <Row className="flex">
                          {(i+1)%4===0?
                              <Col key={i-3} className={pokemonArray[i-3].types[0].name}>
                              <img src={pokemonArray[i-3].image_url} alt={"logo"}/>
                              {idify(""+pokemonArray[i-3].id)}
                              <br></br>
                              <NavLink to={`/pokemon/${pokemonArray[i-3].id}/edit`}>
                                  {namify(pokemonArray[i-3].name)}
                              </NavLink>
                              {pokemonArray[i-3].types?.map((t) => (
                                  <div>{t.name}</div>
                              ))}
                            </Col>
                              : <div></div>
                          }
                          {((i+1)%4===0) || ((i+1)%4===3)?
                              <Col key={i-2} className={pokemonArray[i-2].types[0].name}>
                                  <img src={pokemonArray[i-2].image_url} alt={"logo"}/>
                                  {idify(""+pokemonArray[i-2].id)}
                                  <br></br>
                                  <NavLink to={`/pokemon/${pokemonArray[i-2].id}/edit`}>
                                      {namify(pokemonArray[i-2].name)}
                                  </NavLink>
                                  {pokemonArray[i-2].types?.map((t) => (
                                      <div>{t.name}</div>
                                  ))}
                              </Col>
                              : <div></div>
                          }
                          {((i+1)%4===0) || ((i+1)%4===3) || ((i+1)%4===2)?
                              <Col key={i-1} className={pokemonArray[i-1].types[0].name}>
                                  <img src={pokemonArray[i-1].image_url} alt={"logo"}/>
                                  {idify(""+pokemonArray[i-1].id)}
                                  <br></br>
                                  <NavLink to={`/pokemon/${pokemonArray[i-1].id}/edit`}>
                                      {namify(pokemonArray[i-1].name)}
                                  </NavLink>
                                  {pokemonArray[i-1].types?.map((t) => (
                                      <div>{t.name}</div>
                                  ))}
                              </Col>
                              : <div></div>
                          }
                          <Col key={i} className={pmon.types[0].name}>
                              <img src={pmon.image_url} alt={"logo"}/>
                              {idify(""+pmon.id)}
                              <br></br>
                              <NavLink to={`/pokemon/${pmon.id}/edit`}>
                                  {namify(pmon.name)}
                              </NavLink>
                              {pmon.types?.map((t) => (
                                  <div>{t.name}</div>
                              ))}
                          </Col>
                      </Row>
                  )
              }

          })


          return (
              <div>
              {rows}
              </div>
          )
      };
    }

  return (
    <section className="pokemonlist">
      <Container>{renderPokemon(pokemon)}</Container>
    </section>
  );
};

PokemonList.propTypes = {
  pokemon: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      types: PropTypes.array.isRequired
    })
  ).isRequired,
};

export default PokemonList;
