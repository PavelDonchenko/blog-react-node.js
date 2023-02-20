import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchUsers', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data;
})

const initialState = {
    user: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state){
            state.user = null;
        }
            
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state, action) => {
            state.user = null
            state.status = 'error'
        },
        [fetchAuthMe.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchAuthMe.rejected]: (state) => {
            state.user = null
            state.status = 'error'
        },
        [fetchRegister.pending]: (state) => {
            state.user = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.user = action.payload
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state) => {
            state.user = null
            state.status = 'error'
        }

    }
})

export const { logout } = authSlice.actions

export const authReducer = authSlice.reducer;