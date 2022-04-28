import { configureStore } from '@reduxjs/toolkit'
import { authenticationReducer } from './features/authentication/authenticationSlice'
import { connectionReducer } from './features/connection/connectionSlice'

export default configureStore({
  reducer: {
      authentication: authenticationReducer,
      connection: connectionReducer,
  },
})