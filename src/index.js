import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import countryAll from './templates/countryAll.hbs';
import countryOne from './templates/countryOne.hbs';

const refs = {
  input: document.querySelector('.input'),
  output: document.getElementById('root'),
};
console.log(refs.output);

function getData(e) {
  if (!e.target.value) {
    refs.output.innerHTML = '';
    return;
  }
  fetchCountries(e.target.value)
    .then(countries => {
      if (countries.status === 404) {
        error({
          text: 'The country for your request was not found.Please try again',
        });
        return;
      }

      if (countries.length > 10) {
        error({
          text: 'Too many matches found.Please enter a more specific query!',
        });
        return;
      }

      if (countries.length >= 2) {
        return markupCountriesList(countries);
      }
      return markupCountryCard(countries);
    })
    .catch(err => {
      error({
        text: err,
      });
    });
}
function markupCountriesList(countries) {
  refs.output.innerHTML = countryOne(countries);
}
function markupCountryCard(countries) {
  refs.output.innerHTML = countryAll(countries);
}
refs.input.addEventListener('input', debounce(getData, 500));
