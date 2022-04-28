import { configureStore } from '@reduxjs/toolkit'
import { authenticationReducer } from './features/authentication/authenticationSlice'
import { connectionReducer } from './features/connection/connectionSlice'
import { messagesReducer } from './features/messages/messagesSlice'

export default configureStore({
  reducer: {
      authentication: authenticationReducer,
      connection: connectionReducer,
      messages: messagesReducer,
  },
})