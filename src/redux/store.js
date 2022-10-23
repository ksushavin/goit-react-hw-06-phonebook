import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage';

//reducers
import { filterReducer } from "./filter-slice";
import { contactReducer } from "./contact-slice";


const contactsPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['contacts']
}

const rootReducer = combineReducers({
    contacts: contactReducer,
    filter: filterReducer
})

const persistedReducer = persistReducer(contactsPersistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ),

});

export const persistor = persistStore(store);