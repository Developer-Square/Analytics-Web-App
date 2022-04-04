import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../redux/app/store';

interface IEventsFilterState {
    events: string[];
}

const initialState: IEventsFilterState = {
    events: ['All']
}

const eventsFilterSlice = createSlice({
    name: 'eventFilters',
    initialState,
    reducers: {
        categoriesFilterAdded(state, action: PayloadAction<string>) {
            state.events = state.events.filter(evt => evt !== 'All')
            state.events.push(action.payload)
        },
        categoriesFilterRemoved(state, action: PayloadAction<string>) {
            state.events = state.events.filter(evt => evt !== action.payload)
        }
    }
});

export const { categoriesFilterAdded, categoriesFilterRemoved } = eventsFilterSlice.actions;

export const selectEventsCategory = (state: AppState) => state.eventsMultipleFilters.events;

export default eventsFilterSlice.reducer;
