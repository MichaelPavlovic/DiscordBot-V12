const fetch = require('node-fetch');
const url = 'https://pokeapi.co/api/v2/pokemon'

async function getPokemon(pokemon){
    let response = await fetch(`${url}/${pokemon}`);

    return response.json();
}

module.exports = { getPokemon };