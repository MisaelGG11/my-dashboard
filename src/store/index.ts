import { configureStore, Middleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import counterReducer from './counter/CounterSlice'
import pokemonReducer from './pokemon/PokemonSlice'
import { localStorageMiddleware } from './middlewares/localstorage.middleware'

export const store = configureStore({
  reducer: {
    counter: counterReducer, // Assuming counterReducer is imported from the appropriate slice file
    pokemon: pokemonReducer, // Add your pokemon slice here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // Add custom middlewares here
      localStorageMiddleware as Middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()