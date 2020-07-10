import {auth, firebase, db, storage} from '../firebase'

// data inicial
const dataInicial = {
    loading: false,
    active: false
}

// types
const LOADING = 'LOADING'
const USER_ERROR = 'USER_ERROR'
const USER_SUCCESS = 'USER_SUCCESS'
const SIGNOUT = 'SIGNOUT'

// reducer
export default function userReducer (state = dataInicial, action) {
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial}
        case USER_SUCCESS:
            return {...state, loading: false, user: action.payload, active: true}
        case SIGNOUT:
            return {...dataInicial}
        default:
            return {...state}
    }
}

// action
export const signInAction = () => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    try {

        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        console.log(res.user)

        const user = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const userDB = await db.collection('users').doc(user.email).get()
        console.log(userDB)
        if(userDB.exists){
            // cuando existe el user en firestore
            dispatch({
                type: USER_SUCCESS,
                payload: userDB.data()
            })
            localStorage.setItem('user', JSON.stringify(userDB.data()))
        }else{
            // no existe el user en firestore
            await db.collection('users').doc(user.email).set(user)
            dispatch({
                type: USER_SUCCESS,
                payload: user
            })
            localStorage.setItem('user', JSON.stringify(user))
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR 
        })
    }
}

export const readUserActiveAction = () => (dispatch) => {
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem('user'))
        })
    }
}

export const signOutAction = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('user')
    dispatch({
        type: SIGNOUT
    })
}

export const updateUserAction = (nombreActualizado) => async (dispatch, getState) => {
    dispatch({
        type: LOADING
    })

    const {user} = getState().user
    console.log(user)

    try {
        
        await db.collection('users').doc(user.email).update({
            displayName: nombreActualizado
        })

        const dataUser = {
            ...user,
            displayName: nombreActualizado
        }

        dispatch({
            type: USER_SUCCESS,
            payload: dataUser
        })
        localStorage.setItem('user', JSON.stringify(dataUser))

    } catch (error) {
        console.log(error)
    }
}

export const editarFotoAccion = (imagenEditada) => async(dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    // const {user} = getState().user

    try {

        const {user} = getState().user

        const imagenRef = await storage.ref().child(user.email).child('foto perfil')
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('users').doc(user.email).update({
            photoURL: imagenURL
        })

        const dataUser = {
            ...user,
            photoURL: imagenURL
        }

        dispatch({
            type: USER_SUCCESS,
            payload: dataUser
        })

        localStorage.setItem('user', JSON.stringify(dataUser))
        
    } catch (error) {
        console.log(error)
    }
}

