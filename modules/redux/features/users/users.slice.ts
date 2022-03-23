import { createAsyncThunk, createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from '../../app/store';
import Client from '@/lib/client';

const client = new Client();

export const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({ loading: false, loaded: false });

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
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<Record<string, any>[]>) => {
                usersAdapter.setAll(state, action.payload);
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
    selectById: selectUserById 
} = usersAdapter.getSelectors((state: AppState) => state.users);

export const selectUsersLoading = (state: AppState) => state.users.loading;
export const selectUsersLoaded = (state: AppState) => state.users.loaded;

export default userSlice.reducer;