import { configureStore } from "@reduxjs/toolkit";
import fetchFileReducer from "./fetchFileSlice";
import uploadReducer from "./uploadSlice";
import detailFileReducer from "./detailFileSlice";
import searchFileReducer from "./searchFileSlice";


// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
//   } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
//   };

const rootReducer = combineReducers({ 
    upload: uploadReducer, 
    files: fetchFileReducer,
    detailFile: detailFileReducer,
    search: searchFileReducer
 });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //   },
    // }),
});

// export let persistor = persistStore(store);