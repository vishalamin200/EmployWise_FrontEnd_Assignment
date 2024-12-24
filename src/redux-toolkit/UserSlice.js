import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../Axios/AxiosInstance.js'

const initialState = {
    email: '',
    password: '',
    users: null,
    page: 1,
    totalPages: 0,
}

export const Login = createAsyncThunk('auth/login', async (data, thunkApi) => {
    try {
        const response = axiosInstance.post('/api/login', data)
        toast.promise(response, {
            loading: "Veryfying Credentials...",
            success: "Login Successful",
            error: (er) => er?.response?.data?.error
        })
        return (await response).data
    } catch (error) {
        return thunkApi.rejectWithValue(error?.response?.data?.error)
    }
})

export const fetchUsers = createAsyncThunk('api/fetchUsers/', async (page, thunkApi) => {
    try {
        const response = axiosInstance.get(`/api/users?page=${page}`)
        toast.promise(response, {
            loading: 'Fetching Users...',
            success: "Users Fetched Successfully",
            error: (err) => err?.response?.data?.error
        })
        return (await response).data
    } catch (err) {
        return thunkApi.rejectWithValue(err?.response?.data?.error)
    }
})

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        setPrevPage: (state) => {
            state.page = Math.max(state.page - 1, 1)
        },
        setNextPage: (state) => {
            state.page = Math.min(state.page + 1, state.totalPages)
        }

    },
    extraReducers: (builder) => {
        builder.

            addCase(Login.fulfilled, (state, action) => {
                sessionStorage.setItem("authToken", action?.payload?.token)
            })

            .addCase(Login.rejected, () => {
                sessionStorage.clear()
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                const info = action?.payload
                state.page = info?.page,
                    state.users = info?.data
                state.totalPages = info?.total_pages
            })

    }
})

export const { setPrevPage, setNextPage } = AuthSlice.actions
export default AuthSlice.reducer