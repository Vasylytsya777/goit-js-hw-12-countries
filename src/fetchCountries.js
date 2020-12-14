export default function fetchCountries(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return;
      }
    })
    .catch(error => console.log(error));
}
