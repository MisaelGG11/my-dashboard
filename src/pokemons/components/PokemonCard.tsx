'use client';

import Link from "next/link";
import Image from "next/image";
import { SimplePokemon } from "@/pokemons/interfaces";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleFavorite } from "@/store/pokemon/PokemonSlice";

interface Props {
  pokemon: SimplePokemon;
}


export const PokemonCard = ({ pokemon }:Props) => {

  const { id, name } = pokemon;
  const isFavorite = useAppSelector(state => !!state.pokemon[id]);
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">

          <Image 
              key={ pokemon.id }
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon.id }.svg`}
              width={100}
              height={100}
              alt={ pokemon.name }
              priority={ false }
              loading="lazy"
            />


          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{ name }</p>
          <div className="mt-5">
            <Link
              href={`pokemons/${ name }`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Más información
            </Link>
          </div>
        </div>
        <div className="border-b">
          <div 
            className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
            onClick={() => dispatch(toggleFavorite(pokemon))}
          >

              <div>
                {
                  isFavorite ? (
                    <IoHeart className="text-red-600" />
                  ) : (
                    <IoHeartOutline className="text-red-600" />
                  )
                }
              </div>
              <div className="pl-3">
                <p className="text-sm font-medium text-gray-800 leading-none">
                  {
                    isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"
                  }
                </p>
                <p className="text-xs text-gray-500">View your campaigns</p>
              </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}