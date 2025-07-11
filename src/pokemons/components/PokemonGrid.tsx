import { SimplePokemon } from '@/pokemons/interfaces';
import { PokemonCard } from './PokemonCard';

export function PokemonGrid({ pokemons }: { pokemons: SimplePokemon[] }) {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}
