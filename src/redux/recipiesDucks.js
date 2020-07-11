// import axios from 'axios'
import {db} from '../firebase'

// constant
const dataInicial = {
    count: 0,
    hasLookedForData:false,
    results: []
}

// types
const LOADING = 'LOADING'
const GET_RECIPIES_SUCCESS = 'GET_RECIPIES_SUCCESS'

// reducer
export default function userReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_RECIPIES_SUCCESS:
            return {...state, loading: false, results: action.payload, count: action.payload.length, hasLookedForData: true}
        default:
            return {...state}
    }
}

// action
export const getMyRecipies = () => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    // const user = JSON.parse(localStorage.getItem('user'));
    const {user} = getState().user
    const arrayOfRecipies = [];
    await db.collection('recipies').where("uid", "==", user.uid).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            data = {...data, uid: doc.id};
            arrayOfRecipies.push(data);
        });
        dispatch({
            type: GET_RECIPIES_SUCCESS,
            payload: arrayOfRecipies 
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

export const getRecipies = () => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    // const user = JSON.parse(localStorage.getItem('user'));
    // const {user} = getState().user
    const arrayOfRecipies = [];
    await db.collection('recipies').orderBy("date").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            data = {...data, uid: doc.id};
            arrayOfRecipies.push(data);
        });
        dispatch({
            type: GET_RECIPIES_SUCCESS,
            payload: arrayOfRecipies 
        })
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
