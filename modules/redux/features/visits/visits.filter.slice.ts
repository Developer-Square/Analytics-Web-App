import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

interface IVisitFilterState {
    visit: string;
}

const initialState: IVisitFilterState = {
    visit: 'All'
}

const visitFilterSlice = createSlice({
    name: 'visitFilters',
    initialState,
    reducers: {
        categoryFilterChanged(state, action: PayloadAction<string>){
            state.visit = action.payload
        }
    }
});

export const { categoryFilterChanged } = visitFilterSlice.actions;

export const selectVisitCategory = (state: AppState) => state.visitFilters.visit;

export default visitFilterSlice.reducer;
