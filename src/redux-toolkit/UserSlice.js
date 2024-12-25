import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../axios/AxiosInstance.js'

const initialState = {
    email: '',
    password: '',
    users: null,
    page: 1,
    totalPages: 0,
    deleteUserId: null,
    editUser:null,
    isEditing:true,
    userInfo:null,
    fetchPage:{},
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

export const editUserDetails = createAsyncThunk('api/editUser/', async (data, { rejectWithValue }) => {
    try {
        const response = axiosInstance.put(`/api/users/${data?.id}`)
        toast.promise(response, {
            loading: 'Updating User Details...',
            success: "User Details Successfully",
            error: (err) => err?.response?.data?.error
        })
        
        const details = (await response).data
        return {details,data}

    } catch (err) {
        return rejectWithValue(err?.response?.data?.error)
    }
})

export const deleteUser = createAsyncThunk('api/deleteUser/', async (_, { getState, rejectWithValue }) => {
    try {
        const id = getState()?.User?.deleteUserId
        const response = axiosInstance.delete(`/api/users/${id}`)
        toast.promise(response, {
            loading: 'Deleting User...',
            success: "User Deleted Successfully",
            error: (err) => err?.response?.data?.error
        })
        return (await response).data
    } catch (err) {
        return rejectWithValue(err?.response?.data?.error)
    }
})


const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setPrevPage: (state) => {
            state.page = Math.max(state.page - 1, 1)
            state.fetchPage[state.page] =false
        },
        setNextPage: (state) => {
            state.page = Math.min(state.page + 1, state.totalPages)
            state.fetchPage[state.page] =false
        },

        setDeleteUserId: (state, action) => {
            state.deleteUserId = action.payload
        },

        setEditUser: (state, action) => {
            const userId = action.payload
            const filteredArray = state?.users?.filter((user)=>user?.id === userId)
            state.editUser = filteredArray[0]
            state.userInfo = filteredArray[0]
        },

        toggleEdit:(state)=>{
            state.isEditing = !state.isEditing
        },

        addFetchPage:(state,action)=>{
            const page = action.payload
            state.fetchPage[page]=true
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
            
            .addCase(editUserDetails.fulfilled,(state,action)=>{
                const updatedUser= action?.payload?.data
                state.users = state.users.map((user)=> (user?.id ===  updatedUser?.id)? updatedUser : user )
            })

            .addCase(deleteUser.fulfilled,(state)=>{
                state.users = state.users.filter((user)=>user.id != state.deleteUserId)
            })

    }
})

export const { setPrevPage, setNextPage, setDeleteUserId, setEditUser,toggleEdit,addFetchPage } = UserSlice.actions
export default UserSlice.reducer