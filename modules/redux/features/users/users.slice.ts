import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { AppState } from '../../app/store';
import Client from '@/lib/client';
import { IPaginationResult } from '../../app/types';

const client = new Client();

type User = {
    _id: string;
    anonymousId: string;
    traits: Record<string, any>;
    meta: Record<string, any>;
}

interface IUserPaginationResult extends IPaginationResult {
    documents: User[]
}

export const usersAdapter = createEntityAdapter<User>({ selectId: (user) => user._id });

const initialState = usersAdapter.getInitialState({ loading: false, loaded: false, page: 0, limit: 0, totalCount: 0, totalPages: 0 });

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const res = await client.User().getAllUsers();
    return res.data.results;
});

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        userAdded: usersAdapter.addOne,
        userDeleted: usersAdapter.removeOne,
        userUpdated: usersAdapter.updateOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.loaded = false;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUserPaginationResult>) => {
                usersAdapter.setAll(state, action.payload.documents);
                state.limit = action.payload.limit;
                state.page = action.payload.page;
                state.totalCount = action.payload.totalCount;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false;
            })
    }
});

export const {
    userAdded,
    userDeleted,
    userUpdated
} = userSlice.actions;

export const { 
    selectAll: selectUsers, 
    selectById: selectUserById,
    selectEntities: selectUserEntities, 
} = usersAdapter.getSelectors((state: AppState) => state.users);

export const selectCurrentUser = (_id: string) => createSelector(
    selectUserEntities,
    (user) => user[_id]
)

export const selectUsersLoading = (state: AppState) => state.users.loading;
export const selectUsersLoaded = (state: AppState) => state.users.loaded;
export const selectUsersLimit = (state: AppState) => state.users.limit;
export const selectUsersPage = (state: AppState) => state.users.page;
export const selectUserstotalCount = (state: AppState) => state.users.totalCount;
export const selectUserstotalPages = (state: AppState) => state.users.totalPages;

export default userSlice.reducer;
