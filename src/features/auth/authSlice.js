import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from './authService';

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    message: "",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },

    extraReduers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) =>{
            state.user = action.payload;
            state.isSuccess = true;
            state.message = action.payload;
        })
        .addCase(login.rejected, (state,action)=>{
            state.isError = true;
            state.message = action.payload;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null;
        })
        .addCase(register.fulfilled, (state,action)=>{
            state.isSuccess = true;
            state.message = action.payload;
        })
        .addCase(register.rejected, (state,action)=>{
            state.isError = true;
            state.message = action.payload;
        });
    },
});

export const register = createAsyncThunk('auth/register', async(user, thunkAPI)=>{
    try{
        return await authService.register(user);
    }catch(error){
        const message = error.response.data;
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('auth/login', async(user, thunkAPI)=>{
    try{
        return await authService.login(user);
    }catch(error){
        const message = error.response.data.messageM
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('auth/logout', async(user)=>{
    try{
        return await authService.logout(user);
    }catch(error){
        console.error(error);
    }
})


export const { reset } = authSlice.actions;
export default authSlice.reducer;