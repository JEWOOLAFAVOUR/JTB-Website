import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import constants from "../constants";
import authReducer from "./authReducer";
import midReducer from "./midReducer";
import testReducer from "./testReducer";
import notReducer from "./notReducer";


const persistConfig = {
    key: constants.asyncStorageKey,
    storage: storage,
    blacklist: ['not']
};


const appReducer = persistCombineReducers(persistConfig, {
    auth: authReducer,
    mid: midReducer,
    test: testReducer,
    not: notReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
