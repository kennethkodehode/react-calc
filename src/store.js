import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './features/rootSlice'

const store = configureStore({
  reducer: rootReducer
})

export default store
