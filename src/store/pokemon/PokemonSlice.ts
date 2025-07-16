import { SimplePokemon } from "@/pokemons/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonState {
  [key: string]: SimplePokemon; // Define the shape of your Pokemon state here
}

// const getInitialState = (): PokemonState => {
//   if (typeof window === 'undefined') {
//     return {};
//   }

//   const storedPokemons = localStorage.getItem('pokemons');
//   if (storedPokemons) {
//     return JSON.parse(storedPokemons);
//   }

//   return {};
// }

const initialState: PokemonState = {
  //...getInitialState(),
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<SimplePokemon[]>) {
      const newState: PokemonState = {};
      for (const pokemon of action.payload) {
        newState[pokemon.id] = pokemon;
      }
      return newState;
    },
    toggleFavorite(state, action: PayloadAction<SimplePokemon>) {
      const pokemonId = action.payload.id;
      if (state[pokemonId]) {
        delete state[pokemonId];
      } else {
        state[pokemonId] = action.payload;
      }

      // // TODO: SHOULD NOT BE LIKE THIS
      // localStorage.setItem('pokemons', JSON.stringify(state));
    },
  },
});

export const { setFavorites, toggleFavorite } = pokemonSlice.actions;

export default pokemonSlice.reducer;
