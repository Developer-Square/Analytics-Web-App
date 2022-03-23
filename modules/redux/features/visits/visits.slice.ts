import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../../app/store';
import Client from '@/lib/client';
import { IPaginationResult } from '../../app/types';

const client = new Client();

type Visit = {
    _id: string;
    visit: string;
    properties: Record<string, any>;
    options: Record<string, any>;
    userId: string;
    anonymousId: string;
    meta: Record<string, any>;
}

interface IVisitPaginationResult extends IPaginationResult {
    documents: Visit[]
}

export const visitsAdapter = createEntityAdapter<Visit>({ selectId: (visit) => visit._id });

const initialState = visitsAdapter.getInitialState({ loading: false, loaded: false, page: 0, limit: 0, totalCount: 0, totalPages: 0 });

export const fetchVisits = createAsyncThunk('visits/fetchVisits', async () => {
    const res = await client.Visit().getAllVisits();
    return res.data.results;
});

const visitSlice = createSlice({
    name:'visits',
    initialState,
    reducers: {
        visitAdded: visitsAdapter.addOne,
        visitDeleted: visitsAdapter.removeOne,
        visitUpdated: visitsAdapter.updateOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchVisits.pending, (state) => {
                state.loading = true;
                state.loaded = false;
            })
            .addCase(fetchVisits.fulfilled, (state, action: PayloadAction<IVisitPaginationResult>) => {
                visitsAdapter.setAll(state, action.payload.documents);
                state.limit = action.payload.limit;
                state.page = action.payload.page;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchVisits.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {
    visitAdded,
    visitDeleted,
    visitUpdated
} = visitSlice.actions;

export const { 
    selectAll: selectVisits, 
    selectById: selectVisitById,
    selectEntities: selectVisitEntities, 
} = visitsAdapter.getSelectors((state: AppState) => state.visits);

export const selectCurrentVisit = (_id: string) => createSelector(
    selectVisitEntities,
    (visit) => visit[_id]
)

export const selectVisitsLoading = (state: AppState) => state.visits.loading;
export const selectVisitsLoaded = (state: AppState) => state.visits.loaded;
export const selectVisitsLimit = (state: AppState) => state.visits.limit;
export const selectVisitsPage = (state: AppState) => state.visits.page;
export const selectVisitstotalCount = (state: AppState) => state.visits.totalCount;
export const selectVisitstotalPages = (state: AppState) => state.visits.totalPages;

export default visitSlice.reducer;
