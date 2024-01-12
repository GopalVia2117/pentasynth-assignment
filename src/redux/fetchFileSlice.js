import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
    fetching: false,
    files: [],
    error: '',
    uploading: false,
    uploadError: ''
}

export const fetchFiles =  createAsyncThunk('files/fetchFiles', async () => {
    let url = "http://localhost:5000/files"
    try{
        const response = await axios.get(url);
        return response.data;
    }
    catch(err){
        toast.error(err.message);
        return err.message;
    }
});

export const updateFile =  createAsyncThunk('files/updateFile', async (payload) => {
    let url = "http://localhost:5000/files/" + payload.id
    try{
        const response = await axios.put(url, payload.form);
        // toast.success("File updated successfully", { containerId: "update"})
        return response.data;
    }
    catch(err){
        // toast.error(err.message);
        return err.message;
    }
});

export const deleteFile =  createAsyncThunk('files/deleteFile', async (id) => {
    let url = "http://localhost:5000/files/" + id
    try{
        const response = await axios.delete(url);
        // toast.success("File deleted successfully", {containerId: "delete"})
        return response.data;
    }
    catch(err){
        // toast.error(err.message);
        return err.message;
    }
});


export const fetchFileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile: (state, action) => {
            state.files.unshift(action.payload);
        },
        updateFileInStore: (state, action) => {
            let otherFiles = state.files.filter(file => file._id !== action.payload._id);
            state.files = [...otherFiles, action.payload];
        },
        deleteFileInStore: (state, action) => {
            state.files = state.files.filter(file => file._id !== action.payload._id);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchFiles.pending, state => {
            state.fetching = true
        })
        builder.addCase(fetchFiles.fulfilled, (state, action) => {
            state.fetching = false
            state.files = action.payload
            state.error = ''
        })

        builder.addCase(fetchFiles.rejected, (state, action) => {
            state.fetching = false
            state.files = []
            state.error = action.error.message
        })
    }
});


export const {addFile, updateFileInStore, deleteFileInStore} = fetchFileSlice.actions;
export default fetchFileSlice.reducer;
