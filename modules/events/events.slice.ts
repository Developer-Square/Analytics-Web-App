import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../redux/app/store';
import Client from '@/modules/client/client';
import { IPaginationResult } from '../redux/app/types';
import search from '@/modules/filters/search';
import sanitizeFilters from '@/modules/filters/sanitizeFilters';
import { filterByDateRangeUsingEmbeddedField } from '@/modules/filters/filterByDateRange';
import { groupByAndCount } from '@/modules/filters/groupBy';
import { searchAndSortWithEmbeddedField } from '@/modules/filters/searchAndSort';
import { selectFilteredSortedVisits } from '../visits/visits.slice';

const client = new Client();

export type Event = {
    _id: string;
    event: string;
    properties: Record<string, any>;
    options: Record<string, any>;
    userId: string;
    anonymousId: string;
    meta: Record<string, any>;
}

interface IEventPaginationResult extends IPaginationResult {
    documents: Event[]
}

export const eventsAdapter = createEntityAdapter<Event>({ selectId: (event) => event._id });

const initialState = eventsAdapter.getInitialState({ loading: false, loaded: false, count: 0, eventsPerPage: 10, loadingCount: 0 });

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const res = await client.Event().getAllEvents();
    return res.data.results;
});

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        eventAdded: eventsAdapter.addOne,
        deleted: eventsAdapter.removeOne,
        eventUpdated: eventsAdapter.updateOne,
        eventsPerPageChanged(state, action: PayloadAction<number>) {
            state.eventsPerPage = action.payload;
        },
        addLoadingTimes(state) {
            state.loadingCount += 1
        },
        resetLoadingTimes(state) {
            state.loadingCount = 0
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.loaded = false;
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<IEventPaginationResult>) => {
                eventsAdapter.setAll(state, action.payload.documents);
                state.count = action.payload.count;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchEvents.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {
    eventAdded,
    deleted,
    eventUpdated,
    eventsPerPageChanged,
    addLoadingTimes,
    resetLoadingTimes
} = eventSlice.actions;

export const {
    selectAll: selectEvents,
    selectById: selectEventById,
    selectEntities: selectEventEntities,
} = eventsAdapter.getSelectors((state: AppState) => state.events);

export const selectCurrentEvent = (_id: string) => createSelector(
    selectEventEntities,
    (event) => event[_id]
)

export const selectEventsByDateRange = createSelector(
    selectEvents,
    (state: AppState) => state.dateFilters,
    (events, dateFilters) => filterByDateRangeUsingEmbeddedField(events, dateFilters.finalDate, dateFilters.initialDate, dateFilters.outerField, dateFilters.filterKey)
)

export const selectFilteredEvents = createSelector(
    selectEventsByDateRange,
    (state: AppState) => state.eventFilters,
    (events, eventFilters) => search(events, sanitizeFilters(eventFilters))
)

export const selectFilteredSortedEvents = createSelector(
    selectEventsByDateRange,
    (state: AppState) => state.eventFilters,
    (state: AppState) => state.eventSorting,
    (events, eventFilters, sortingFilters) => searchAndSortWithEmbeddedField(events, sanitizeFilters(eventFilters), sortingFilters.ascending, 'meta', sortingFilters.sortKey)
)

export const selectEventTotals = createSelector(
    selectFilteredEvents,
    (events) => groupByAndCount(events, 'event')
)

export const selectEventsAndVisits = createSelector(
    selectFilteredSortedEvents,
    selectFilteredSortedVisits,
    (events, visits) => events.concat(visits)
)

export const selectEventsLoading = (state: AppState) => state.events.loading;
export const selectEventsLoaded = (state: AppState) => state.events.loaded;
export const selectEventsCount = (state: AppState) => state.events.count;
export const selectEventsPerPage = (state: AppState) => state.events.eventsPerPage;

export default eventSlice.reducer;
