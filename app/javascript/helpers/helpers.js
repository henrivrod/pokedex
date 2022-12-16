import { error } from './notifications';

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isValidDate = (dateObj) => !Number.isNaN(Date.parse(dateObj));

export const validatePokemon = (pmon) => {
  const errors = {};

  if (pmon.name === '') {
    errors.pokemon_type = 'You must enter a valid name';
  }

  if (pmon.image_url === '') {
    errors.pokemon_image_url = 'You must enter a valid image url';
  }

  if (pmon.image_url.match(/\.(png)$/) === null) {
    errors.pokemon_image_url = 'You must enter a valid image url';
  }

  if (pmon.types.length === 0) {
    errors.pokemon_types = 'You must have at least one type';
  }

  if (pmon.types.length > 2) {
    errors.pokemon_types = 'You cannot have more than two types';
  }
  return errors;
};

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.error(err);
};
