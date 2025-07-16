"use client";

import { SimplePokemon } from "@/pokemons/interfaces";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { PokemonGrid } from "./PokemonGrid";
import { setFavorites } from "@/store/pokemon/PokemonSlice";

export function FavoritePokemons() {
  
  const dispatch = useAppDispatch();
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("pokemons");
    if (stored) {
      try {
        const parsed: { [key: string]: SimplePokemon } = JSON.parse(stored);
        dispatch(setFavorites(Object.values(parsed)));
        setPokemons(Object.values(parsed));
      } catch (error) {
        console.error("Error parsing pokemons from localStorage:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      {pokemons.length > 0 ? (
        <PokemonGrid pokemons={pokemons} />
      ) : (
        <NoFavorites />
      )}
    </>
  );
}

export const NoFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <IoHeartOutline className="text-6xl text-red-600 mb-4" size={150} />
      <h1 className="text-2xl font-bold">No hay Pokemons Favoritos</h1>
      <p className="text-gray-500">Agrega algunos a tu lista de favoritos.</p>
    </div>
  );
};
