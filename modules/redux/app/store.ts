import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import { combineReducers } from "redux"; 

// Reducers
import usersReducer from '../features/users/users.slice';
import eventsReducer from '../features/events/events.slice';
import visitsReducer from '../features/visits/visits.slice';
import eventsFilterReducer from '../features/events/events.filter.slice';
import eventsDateFilterReducer from '../features/events/events.dateFilter.slice';
import visitsFilterReducer from '../features/visits/visits.filter.slice';
import eventsSortingReducer from '../features/events/events.sorting.slice';
import visitsSortingReducer from '../features/visits/visits.sorting.slice';

const rootReducer = combineReducers({
    users: usersReducer,
    events: eventsReducer,
    visits: visitsReducer,
    eventFilters: eventsFilterReducer,
    eventDateFilters: eventsDateFilterReducer,
    visitFilters: visitsFilterReducer,
    eventSorting: eventsSortingReducer,
    visitSorting: visitsSortingReducer,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
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
