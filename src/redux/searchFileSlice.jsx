import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    searching: false,
    searchedFiles: [],
    searchError: ''
}

export const searchFile = createAsyncThunk('files/searchFile', async (term) => {
    let url = "http://localhost:5000/files/search?name=" + term;
    try{
        console.log(term);
        const response = await axios.get(url);
        return response.data;
    }
    catch(err){
        return err.message;
    }
});


export const searchFileSlice = createSlice({
    name: 'searches',
    initialState,
    reducers: {
        clearSearchedFiles: (state, action) => {
            state.searchedFiles = []
        }
    },
    extraReducers: builder => {
        builder.addCase(searchFile.pending, state => {
            state.searching = true
        })
        builder.addCase(searchFile.fulfilled, (state, action) => {
            state.searching = false
            state.searchedFiles = action.payload
            state.searchError = ''
        })

        builder.addCase(searchFile.rejected, (state, action) => {
            state.searchError = action.error.message
        })
    }
});


export const {clearSearchedFiles} = searchFileSlice.actions;
export default searchFileSlice.reducer;
