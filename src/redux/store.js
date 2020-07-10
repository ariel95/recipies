import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import recipieReducer from './recipiesDucks'
import userReducer, {readUserActiveAction} from './userDucks'


const rootReducer = combineReducers({
    //pokemones: pokeReducer,
    recipie: recipieReducer,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore( rootReducer,  composeEnhancers( applyMiddleware(thunk) ))
    readUserActiveAction()(store.dispatch)
    return store;
}