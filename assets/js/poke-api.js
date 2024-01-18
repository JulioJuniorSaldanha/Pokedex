
const pokeApi={}

function detailToModel(pokedetail){
    const pokemon = new Pokemon();
    pokemon.number ="#"+ pokedetail.order;
    pokemon.name = pokedetail.name[0].toUpperCase()+(pokedetail.name.substring(1) );
    
    const types = pokedetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.image = pokedetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(detailToModel)
}

pokeApi.getPokemons = (offset = 0, limit= 151) => {    
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}.`
    
   return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}