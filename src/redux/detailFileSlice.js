import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import nextIcon from "@/app/favicon.ico"

const initialState = {
    file: {
        file_url: nextIcon.src,
        name: 'favicon.ico',
        size: 21000000,
        type: 'image/png',
        description: 'This is the official icon of the Next.js Framework',
        uploaded_at: new Date(Date.now()).toDateString()
    }
}



export const detailFileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setDetailedFile: (state, action) => {
            state.file = action.payload
        }
    },
    
});


export const {setDetailedFile} = detailFileSlice.actions;
export default detailFileSlice.reducer;
