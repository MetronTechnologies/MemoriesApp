import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "../Reducers/RootReducer";
import {logger} from "redux-logger/src";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

function MemoryStore(){
    return (
        createStore(
            rootReducer,
            composeWithDevTools(
                applyMiddleware(logger, thunk)
            )
        )
    );
}

export {MemoryStore}