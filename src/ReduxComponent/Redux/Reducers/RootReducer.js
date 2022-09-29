import { combineReducers } from 'redux';
import {MemoryReducer} from "./Reducer";



const rootReducer = combineReducers(
    {
        posts: MemoryReducer
    }
);

export {rootReducer}