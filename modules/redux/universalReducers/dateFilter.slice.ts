import addMonths from '@/modules/filters/addMonths';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../app/store';

interface IDateFilterState {
    finalDate: number;
    initialDate: number;
    filterKey: string;
    outerField: string;
}

const initialState: IDateFilterState = {
    finalDate: new Date().getTime(),
    initialDate: addMonths(new Date(), -1),
    filterKey: 'timestamp',
    outerField: 'meta',
}

const dateFilterSlice = createSlice({
    name: 'dateFilters',
    initialState,
    reducers: {
        finalDateChanged(state, action: PayloadAction<number>){
            state.finalDate = action.payload;
        },
        initialDateChanged(state, action: PayloadAction<number>){
            state.initialDate = action.payload;
        },
        filterKeyChanged(state, action: PayloadAction<string>){
            state.filterKey = action.payload;
        },
        outerFieldChanged(state, action: PayloadAction<string>){
            state.outerField = action.payload;
        }
    }
});

export const { finalDateChanged, initialDateChanged, filterKeyChanged, outerFieldChanged } = dateFilterSlice.actions;

export const selectFinalDate = (state: AppState) => state.dateFilters.finalDate;
export const selectInitialDate = (state: AppState) => state.dateFilters.initialDate;
export const selectFilterKey = (state: AppState) => state.dateFilters.filterKey;
export const selectOuterField = (state: AppState) => state.dateFilters.outerField;

export default dateFilterSlice.reducer;
