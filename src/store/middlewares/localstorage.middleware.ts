import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";

export const localStorageMiddleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: Action) => {
  const result = next(action);

  // Action related to Pokemon slice
  if (action.type.startsWith('pokemon/')) {
    const state = store.getState();
    const pokemons = state.pokemon;

    // Save the current state of pokemons to localStorage
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }

  return result;
}