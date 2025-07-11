import { PokemonAPIResponse, SimplePokemon } from "@/pokemons/interfaces";

import { PokemonGrid } from "@/pokemons/components";

interface PageParams {
  limit?: number;
  offset?: number;
}
const getPokemons = async ({
  limit = 10,
  offset = 0,
}: PageParams): Promise<SimplePokemon[]> => {
  const data: PokemonAPIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch Pokemons");
    }
    return res.json();
  });

  const pokemons: SimplePokemon[] = data.results.map((pokemon) => {
    const urlParts = pokemon.url.split("/");
    const id = urlParts[urlParts.length - 2];
    return {
      id: id,
      name: pokemon.name
    }
  });

  return pokemons;
};

export default async function PokemonPage() {
  const pokemons = await getPokemons({ limit: 50, offset: 0 });

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Listado de Pokemons <span className="text-sm">Estático</span></h1>
      
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
