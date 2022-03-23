import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// Reducers
import usersReducer from '../features/users/users.slice';
import eventsReducer from '../features/events/events.slice';

const store = configureStore({
    reducer: {
        users: usersReducer,
        events: eventsReducer,
    },
})

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>;

export default store;
