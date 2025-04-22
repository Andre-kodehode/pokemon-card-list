// Pokémon details
import pokemonData from './pokemon-data.js';

const container = document.querySelector('#pokemon-container');
const searchInput = document.querySelector('#search-input');

function renderPokemons(data) {
  container.innerHTML = '';

  let currentGroup = [];

  for (let i = 0; i < data.length; i++) {
    const pokemon = data[i];
    currentGroup.push(pokemon);

    // If Pokémon can't evolve, catch(group) em all.
    if (!pokemon.isEvovable) {
      const evolutionBox = document.createElement('section');
      evolutionBox.classList.add('evolution-box');

      for (let j = 0; j < currentGroup.length; j++) {
        const p = currentGroup[j];

        const typeSection = document.createElement('section');
        typeSection.classList.add(p.type);

        const pokemonID = document.createElement('h2');

        // Formatted Pokèmon ID to always have 3 digits.
        pokemonID.textContent = `Pokémon #${('000' + p.id).slice(-3)}`;


        const pokemonName = document.createElement('p');
        pokemonName.textContent = p.name;

        const pokemonType = document.createElement('p');
        pokemonType.textContent = `Type ${pokemon.type} ` ;

        const pokemonImage = document.createElement('img');
        pokemonImage.src = p.path;
        pokemonImage.alt = p.name;

        typeSection.appendChild(pokemonID);
        typeSection.appendChild(pokemonName);
        typeSection.appendChild(pokemonType);
        typeSection.appendChild(pokemonImage);

        evolutionBox.appendChild(typeSection);
      }

      container.appendChild(evolutionBox);
      currentGroup = []; // Resetting the group
    }
  }
}

// First render
renderPokemons(pokemonData);

searchInput.addEventListener('input', function() {
  const query = searchInput.value.toLowerCase().trim();

  // If empty search show all Pokémon
  if (query === "") {
    renderPokemons(pokemonData);
    return;
  }

  const matchingPokemons = [];
  
  // Match Pokémon by name
  pokemonData.forEach(function(p) {
    if (p.name.toLowerCase().includes(query)) {
      matchingPokemons.push(p);
    }
  });

  const container = document.querySelector('#pokemon-container');
  
  // No Pokémon match show a message
  if (matchingPokemons.length === 0) {
    container.innerHTML = "<p>No results found for your search.</p>";
    return;
  }

  // Get evolution lines of Pokémon
  const evolutionLines = new Set();
  
  // Adds evolution lines to Pokémon
  matchingPokemons.forEach(function(p) {
    p["evolution-line"].forEach(function(line) {
      evolutionLines.add(line);
    });
  });

  // Gathered all Pokémon belonging to any of the evolution lines
  const filteredData = [];
  
  pokemonData.forEach(function(p) {
    if (
      p["evolution-line"].some(function(line) { return evolutionLines.has(line); }) ||
      evolutionLines.has(p["evolution-line"])
    ) {
      filteredData.push(p);
    }
  });

  // Render the filtered Pokémon data
  renderPokemons(filteredData);
});


