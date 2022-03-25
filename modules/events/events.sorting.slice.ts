import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../redux/app/store';

interface IEventSortingFilterState {
    ascending: boolean;
    sortKey: string;
}

const initialState: IEventSortingFilterState = {
    ascending: false,
    sortKey: 'timestamp',
}

const eventSortingSlice = createSlice({
    name: 'eventSorting',
    initialState,
    reducers: {
        sortingOrderChanged(state, action: PayloadAction<boolean>){
            state.ascending = action.payload
        },
        sortingKeyChanged(state, action: PayloadAction<string>){
            state.sortKey = action.payload
        }
    }
})

export const { sortingOrderChanged, sortingKeyChanged } = eventSortingSlice.actions;

export const selectSortingOrder = (state: AppState) => state.eventSorting.ascending;
export const selectSortingKey = (state: AppState) => state.eventSorting.sortKey;

export default eventSortingSlice.reducer;
