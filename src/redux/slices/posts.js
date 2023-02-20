import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data;
})
export const fetchTags = createAsyncThunk('post/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data;
})
export const removePost = createAsyncThunk('post/removePost', async (id) => {
    axios.delete(`/posts/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    redusers: {},
    extraReducers: {
        //getting posts
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = 'loaded'
            state.posts.items = action.payload
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.status = 'error'
            state.posts.items = []
        },
        //getting tags
        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = 'loaded'
            state.tags.items = action.payload
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.status = 'error'
            state.tags.items = []
        },
        //deleting post
        [removePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg)
        },
    }
})

export const postReducer = postsSlice.reducer;