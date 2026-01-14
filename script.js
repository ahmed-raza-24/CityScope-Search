const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatch(wordToMatch, cities){
    return cities.filter(place => {

    const regex = RegExp(wordToMatch, 'gi');
    return place.city.match(regex) ||  place.state.match(regex) 
    });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


function displayMatches() {
  if (!this.value) {
    suggestions.innerHTML = '';
    return;
  }

  const matchArray = findMatch(this.value, cities);
  const regex = new RegExp(this.value, 'gi');

  const html = matchArray.map(place => {
    const cityname = place.city.replace(
      regex,
      `<span class="hl">$&</span>`
    );
    const statename = place.state.replace(
      regex,
      `<span class="hl">$&</span>`
    );

    return `
      <li>
        <span class="name">${cityname}, ${statename}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.temp');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);