import addMonths from '@/modules/filters/addMonths';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';

interface IEventDateFilterState {
    finalDate: Date;
    initialDate: Date;
    filterKey: string;
    outerField: string;
}

const initialState: IEventDateFilterState = {
    finalDate: new Date(),
    initialDate: addMonths(new Date(), -1),
    filterKey: 'timestamp',
    outerField: 'meta',
}

const eventDateFilterSlice = createSlice({
    name: 'eventDateFilters',
    initialState,
    reducers: {
        finalDateChanged(state, action: PayloadAction<Date>){
            state.finalDate = action.payload;
        },
        initialDateChanged(state, action: PayloadAction<Date>){
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

export const { finalDateChanged, initialDateChanged, filterKeyChanged, outerFieldChanged } = eventDateFilterSlice.actions;

export const selectFinalDate = (state: AppState) => state.eventDateFilters.finalDate;
export const selectInitialDate = (state: AppState) => state.eventDateFilters.initialDate;
export const selectFilterKey = (state: AppState) => state.eventDateFilters.filterKey;
export const selectOuterField = (state: AppState) => state.eventDateFilters.outerField;

export default eventDateFilterSlice.reducer;
