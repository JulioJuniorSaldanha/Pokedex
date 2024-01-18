function ConvertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToHTML(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
    <span class="numero">${pokemon.number}</span>  
    <span class="name">${pokemon.name}</span> 
    
                
    <div class="detail">
       
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>
    </div>
    <img src="${pokemon.image}"
        alt="${pokemon.name}">
</li>
    `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('');
})