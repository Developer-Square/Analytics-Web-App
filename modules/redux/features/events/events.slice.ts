import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../../app/store';
import Client from '@/lib/client';
import { IPaginationResult } from '../../app/types';
import search from '@/modules/filters/search';
import sanitizeFilters from '@/modules/filters/sanitizeFilters';
import { filterByDateRangeUsingEmbeddedField } from '@/modules/filters/filterByDateRange';
import { groupByAndCount } from '@/modules/filters/groupBy';
import { searchAndSortWithEmbeddedField } from '@/modules/filters/searchAndSort';
import { selectFilteredSortedVisits } from '../visits/visits.slice';

const client = new Client();

type Event = {
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

const initialState = eventsAdapter.getInitialState({ loading: false, loaded: false, page: 0, limit: 0, totalCount: 0, totalPages: 0 });

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
    const res = await client.Event().getAllEvents();
    return res.data.results;
});

const eventSlice = createSlice({
    name:'events',
    initialState,
    reducers: {
        eventAdded: eventsAdapter.addOne,
        eventDeleted: eventsAdapter.removeOne,
        eventUpdated: eventsAdapter.updateOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.loading = true;
                state.loaded = false;
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<IEventPaginationResult>) => {
                eventsAdapter.setAll(state, action.payload.documents);
                state.limit = action.payload.limit;
                state.page = action.payload.page;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
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
    eventDeleted,
    eventUpdated
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
    (state: AppState) => state.eventDateFilters,
    (events, eventDateFilters) => filterByDateRangeUsingEmbeddedField(events, eventDateFilters.finalDate, eventDateFilters.initialDate, eventDateFilters.outerField, eventDateFilters.filterKey)
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
export const selectEventsLimit = (state: AppState) => state.events.limit;
export const selectEventsPage = (state: AppState) => state.events.page;
export const selectEventstotalCount = (state: AppState) => state.events.totalCount;
export const selectEventstotalPages = (state: AppState) => state.events.totalPages;

export default eventSlice.reducer;
