import { FavoritePokemons } from "@/pokemons/components";

export default function PokemonPage() {
  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Listado de Pokemons Favoritos ♥ <span className="text-sm">Global State RTK</span></h1>
      
      <FavoritePokemons />
    </div>
  );
}
