// import axios from 'axios'
import {db, storage} from '../firebase'

// constant
const dataInicial = {
    count: 0,
    hasLookedForData:false,
    results: []
}

// types
const LOADING = 'LOADING'
const ERROR = 'ERROR'
const GET_RECIPIES_SUCCESS = 'GET_RECIPIES_SUCCESS'
const ADD_RECIPIE_SUCCESS = 'ADD_RECIPIE_SUCCESS'

// reducer
export default function userReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case GET_RECIPIES_SUCCESS:
            return {...state, loading: false, results: action.payload, count: action.payload.length, hasLookedForData: true}
        case ADD_RECIPIE_SUCCESS:
            return {...state, loading: false}
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
    await db.collection('recipies').where("uid", "==", user.uid).orderBy("date", "desc").get()
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
    await db.collection('recipies').orderBy("date", "desc").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let data = doc.data();
            data = {...data, id: doc.id};
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

export const addRecipie = (recipie, image) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().user
 
    //Add the image url to the recipie
    let imageURL = "" 
    if(image){
        console.log("add recipie con imagen")
        const fileName = user.uid + Math.random().toString();
        const imageRef = await storage.ref().child(user.email).child('Recipies images').child(fileName)
        await imageRef.put(image)
        imageURL = await imageRef.getDownloadURL();
        //Add the image url to the recipie
        recipie = {...recipie, imageUrl: imageURL}
    }
    
    //Add user id and date to the recipie
    recipie = {...recipie, uid: user.uid, date: new Date()}

    //Add the recipie    
    db.collection("recipies").add(recipie)
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        dispatch({
            type: ADD_RECIPIE_SUCCESS
        })
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        dispatch({
            type: ERROR
        })
    });
}