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
import usersReducer from '../../users/users.slice';
import eventsReducer from '../../events/events.slice';
import visitsReducer from '../../visits/visits.slice';
import eventsFilterReducer from '../../events/events.filter.slice';
import visitsFilterReducer from '../../visits/visits.filter.slice';
import eventsSortingReducer from '../../events/events.sorting.slice';
import visitsSortingReducer from '../../visits/visits.sorting.slice';
import dateFilterReducer from '../universalReducers/dateFilter.slice';

const rootReducer = combineReducers({
    users: usersReducer,
    events: eventsReducer,
    visits: visitsReducer,
    eventFilters: eventsFilterReducer,
    visitFilters: visitsFilterReducer,
    eventSorting: eventsSortingReducer,
    visitSorting: visitsSortingReducer,
    dateFilters: dateFilterReducer,
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
