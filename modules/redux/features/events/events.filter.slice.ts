import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

interface IEventFilterState {
    event: string;
}

const initialState: IEventFilterState = {
    event: 'All'
}

const eventFilterSlice = createSlice({
    name: 'eventFilters',
    initialState,
    reducers: {
        categoryFilterChanged(state, action: PayloadAction<string>){
            state.event = action.payload
        }
    }
});

export const { categoryFilterChanged } = eventFilterSlice.actions;

export const selectEventCategory = (state: AppState) => state.eventFilters.event;

export default eventFilterSlice.reducer;
