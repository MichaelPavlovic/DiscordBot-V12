//import
const fetch = require('node-fetch');

async function getPokemon(pokemon){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //attempt to search for the pokemon the user entered and return the response as json

    return response.json();
}

module.exports = { getPokemon };