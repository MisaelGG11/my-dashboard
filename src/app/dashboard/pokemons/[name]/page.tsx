import { Pokemon, PokemonAPIResponse } from "@/pokemons/interfaces";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ name: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const pokemons = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => res.json())
    .then((data: PokemonAPIResponse) => data.results);

  return pokemons.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
     const { name: pokemonName } = await params
    const { id, name } = await getPokemon(pokemonName);

    return {
      title: `#${id} - ${name}`,
      description: `Página del pokémon ${name}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Página del pokémon",
      description:
        "Culpa cupidatat ipsum magna reprehenderit ex tempor sint ad minim reprehenderit consequat sit.",
    };
  }
}

const getPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      // cache: "force-cache", // TODO: cambiar esto en un futuro
      next: {
        revalidate: 60 * 60 * 30 * 6
      }
    }).then((resp) => resp.json());

    console.log("Se cargó: ", pokemon.name);

    return pokemon;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    notFound();
  }
};

export default async function PokemonPage({ params }: Props) {
   const { name } = await params
  const pokemon = await getPokemon(name);

  return (
    <div className="flex mt-5 flex-col items-center text-slate-800">
      <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
        <div className="mt-2 mb-8 w-full">
          <h1 className="px-2 text-2xl font-bold text-slate-700 capitalize">
            #{pokemon.id} {pokemon.name}
          </h1>
          <div className="flex flex-col justify-center items-center">

            <Image
              src={pokemon.sprites.other?.dream_world.front_default ?? ""}
              width={150}
              height={150}
              alt={`Imagen del pokemon ${pokemon.name}`}
              className="mb-5"
            />

            <div className="flex justiy flex-wrap gap-1">
              {pokemon.moves.map((move) => (
                <span key={move.move.name} className="bg-blue-200 text-blue-900 font-medium me-2 px-2.5 py-0.5 rounded-sm">
                  {move.move.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 px-2 w-full">
          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm font-semibold text-slate-700 mb-2">Types</p>
            <div className="text-base font-medium text-navy-700 flex gap-2">
              {pokemon.types.map((type) => (
                <Image
                  key={type.type.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${type.type.url!.split('type/')[1].replace('/', '')}.png`}
                  alt={type.type.name}
                  width={100}
                  height={20}
                  className="rounded-md"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
            <p className="text-sm font-semibold text-slate-700 mb-2">Peso</p>
            <span className="text-base font-medium text-navy-700 flex">
              {pokemon.weight}
            </span>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm font-semibold text-slate-700">Regular Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_default}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
            <p className="text-sm font-semibold text-slate-700">Shiny Sprites</p>
            <div className="flex justify-center">
              <Image
                src={pokemon.sprites.front_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />

              <Image
                src={pokemon.sprites.back_shiny}
                width={100}
                height={100}
                alt={`sprite ${pokemon.name}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
