import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    uploading: false,
    uploadedFile: null,
    uploadError: ''
}

export const uploadFile = createAsyncThunk('files/uploadFile', async (form) => {
    let url = "http://localhost:5000/files"
    try{
        console.log(form);
        const response = await axios.post(url, form);
        return response.data;
    }
    catch(err){
        return err.message;
    }
});


export const uploadFileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder.addCase(uploadFile.pending, state => {
            state.uploading = true
        })
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.uploading = false
            state.uploadedFile = action.payload
            state.uploadError = ''
        })

        builder.addCase(uploadFile.rejected, (state, action) => {
            state.uploadError = action.error.message
        })
    }
});


// export const {fetchFilesRequest, fetchFilesSuccess, fetchFilesError} = uploadFileSlice.actions;
export default uploadFileSlice.reducer;
