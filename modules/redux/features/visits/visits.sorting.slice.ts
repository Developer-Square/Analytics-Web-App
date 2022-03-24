import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

interface IVisitSortingFilterState {
    ascending: boolean;
    sortKey: string;
}

const initialState: IVisitSortingFilterState = {
    ascending: false,
    sortKey: 'timestamp',
}

const visitSortingSlice = createSlice({
    name: 'visitSorting',
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

export const { sortingOrderChanged, sortingKeyChanged } = visitSortingSlice.actions;

export const selectSortingOrder = (state: AppState) => state.visitSorting.ascending;
export const selectSortingKey = (state: AppState) => state.visitSorting.sortKey;

export default visitSortingSlice.reducer;
