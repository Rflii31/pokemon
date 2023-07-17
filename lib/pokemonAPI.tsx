
const POKEMON_API = "https://pokeapi.co/api/v2/";

export async function getPokemonList() {
    const response = await fetch(POKEMON_API + "pokemon?limit=850&offset=0");
    const data = await response.json();
    return data.results;
}

export async function getPokemon(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();
    return data;
}

