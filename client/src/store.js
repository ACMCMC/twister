import { configureStore } from '@reduxjs/toolkit'
import { authenticationReducer } from './features/authentication/authenticationSlice'
import { connectionReducer } from './features/connection/connectionSlice'
import { messagesReducer } from './features/messages/messagesSlice'
import { statisticsReducer } from './features/statistics/statisticsSlice'
import { usersReducer } from './features/users/usersSlice'

export default configureStore({
  reducer: {
      authentication: authenticationReducer,
      connection: connectionReducer,
      messages: messagesReducer,
      users: usersReducer,
      statistics: statisticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredPaths: ['messages'],
        ignoredActionPaths: ['*'],
        ignoredActions: ['messages/addMessage'],
      },
    }),
})