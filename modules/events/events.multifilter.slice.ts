import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../redux/app/store';

interface IEventsFilterState {
    events: string[];
}

const initialState: IEventsFilterState = {
    events: ['login']
}

const eventsFilterSlice = createSlice({
    name: 'eventFilters',
    initialState,
    reducers: {
        categoriesFilterChanged(state, action: PayloadAction<string>) {
            state.events = []
            state.events.push(action.payload)
        }
    }
});

export const { categoriesFilterChanged } = eventsFilterSlice.actions;

export const selectEventsCategory = (state: AppState) => state.eventsMultipleFilters.events;

export default eventsFilterSlice.reducer;
