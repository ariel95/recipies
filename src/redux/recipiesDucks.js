// import axios from 'axios'
import { db, storage } from '../firebase'

// constant
const dataInicial = {
    redirect: null,
    hasToUpdate: 0,
    loading: false,
    count: 0,
    hasLookedForData: false,
    results: []
}

// types
const RECIPIE_LOADING = 'RECIPIE_LOADING'
const RECIPIE_ERROR = 'RECIPIE_ERROR'
const GET_RECIPIES_SUCCESS = 'GET_RECIPIES_SUCCESS'
const ADD_RECIPIE_SUCCESS = 'ADD_RECIPIE_SUCCESS'
const DELETE_RECIPIE_SUCCESS = 'DELETE_RECIPIE_SUCCESS'

// reducer
export default function userReducer(state = dataInicial, action) {
    switch (action.type) {
        case RECIPIE_LOADING:
            return { ...state, loading: true }
        case GET_RECIPIES_SUCCESS:
            return { ...state, loading: false, results: action.payload, count: action.payload.length, hasLookedForData: true }
        case ADD_RECIPIE_SUCCESS:
            return { ...state, loading: false, redirect:true }
        case DELETE_RECIPIE_SUCCESS:
            return { ...state, loading: false, hasToUpdate: state.hasToUpdate+1}
        case RECIPIE_ERROR:
            return { ...state, loading: false }
        default:
            return { ...state }
    }
}

// action
export const getMyRecipies = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })

    const { user } = getState().user
    const arrayOfRecipies = [];
    try {
        //Get recipies
        const docs = await db.collection('recipies').where("uid", "==", user.email).orderBy("date", "desc").get()

        //Get owners of that recipies
        await Promise.all(docs.docs.map(async (doc) => {
            let data = doc.data();
            const user = await db.collection('users').doc(data.uid).get()
            let dataUser = user.data();
            data = { ...data, id: doc.id, user: dataUser };
            arrayOfRecipies.push(data);
        }));

        dispatch({
            type: GET_RECIPIES_SUCCESS,
            payload: arrayOfRecipies
        })

    } catch (error) {
        console.log("Error getting documents: ", error);
            dispatch({
                type: RECIPIE_ERROR
            })
    }
    
}

export const getRecipies = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })
    // .startAt(1000000)
    // .limit(3)
    const arrayOfRecipies = [];
    try {
        const docs = await db.collection('recipies').orderBy("date", "desc").get();

        await Promise.all(docs.docs.map(async (doc) => {
            let data = doc.data();
            const user = await db.collection('users').doc(data.uid).get()
            let dataUser = user.data();
            data = { ...data, id: doc.id, user: dataUser };
            arrayOfRecipies.push(data);
        }));

        dispatch({
            type: GET_RECIPIES_SUCCESS,
            payload: arrayOfRecipies
        })

    } catch (error) {
        console.log("Error getting documents: ", error);
            dispatch({
                type: RECIPIE_ERROR
            })
    }
        
}

export const addRecipie = (recipie, image) => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })
    const { user } = getState().user

    //Add the image url to the recipie
    let imageURL = ""
    if (image) {
        const fileName = user.uid + Math.random().toString();
        const imageRef = await storage.ref().child(user.email).child('Recipies images').child(fileName)
        await imageRef.put(image)
        imageURL = await imageRef.getDownloadURL();
        //Add the image url to the recipie
        recipie = { ...recipie, imageUrl: imageURL }
    }

    //Add user id and date to the recipie
    recipie = { ...recipie, uid: user.email, date: new Date() }

    //Add the recipie    
    db.collection("recipies").add(recipie)
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            dispatch({
                type: ADD_RECIPIE_SUCCESS
            })
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
            dispatch({
                type: RECIPIE_ERROR
            })
        });
}

export const deleteRecipie = (idRecipie) => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })
    const { user } = getState().user

    db.collection("recipies").doc(idRecipie).get()
        .then(function (doc) {
            if (doc.exists) {
                if (user.email !== doc.data().uid) {
                    console.log("No puede borrar")
                    return;
                }
                console.log("Puede borrar")
                db.collection("recipies").doc(idRecipie).delete()
                    .then(function () {
                        console.log("Document successfully deleted!");
                        dispatch({
                            type: DELETE_RECIPIE_SUCCESS
                        })
                    }).catch(function (error) {
                        console.error("Error removing document: ", error);
                        dispatch({
                            type: RECIPIE_ERROR
                        })
                    });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                dispatch({
                    type: RECIPIE_ERROR
                })
                return;
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
            dispatch({
                type: RECIPIE_ERROR
            })
        });


}