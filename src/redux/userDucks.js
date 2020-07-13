import {auth, firebase, db, storage} from '../firebase'

// data inicial
const dataInicial = {
    loading: false,
    active: false
}

// types
const USER_LOADING = 'USER_LOADING'
const USER_ERROR = 'USER_ERROR'
const USER_SUCCESS = 'USER_SUCCESS'
const SIGNOUT = 'SIGNOUT'

// reducer
export default function userReducer (state = dataInicial, action) {
    switch(action.type){
        case USER_LOADING:
            return {...state, loading: true}
        case USER_ERROR:
            return {...dataInicial,loading: false}
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
        type: USER_LOADING
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
    dispatch({
        type: USER_LOADING
    })
    if(localStorage.getItem('user')){
        dispatch({
            type: USER_SUCCESS,
            payload: JSON.parse(localStorage.getItem('user'))
        })
    }
    else{
        dispatch({
            type: USER_ERROR,
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

export const updateUserAction = (data, newImage) => async (dispatch, getState) => {
    console.log("updateUserAction")
    dispatch({
        type: USER_LOADING
    })
    const {user} = getState().user

    let dataUser = {
        ...user,
        displayName: data.displayName
    }

    try {
        
        //Update profile picture
        if(newImage){
            const imageRef = await storage.ref().child(user.email).child('Profile picture')
            await imageRef.put(newImage)
            const imageURL = await imageRef.getDownloadURL()

            //Update data with image
            await db.collection('users').doc(user.email).update({
                displayName: data.displayName,
                photoURL: imageURL
            })
            dataUser = {
                ...dataUser, photoURL: imageURL
            }
        }
        else{
            //Update data without image
            await db.collection('users').doc(user.email).update({
                displayName: data.displayName,
            })
        }

        dispatch({
            type: USER_SUCCESS,
            payload: dataUser
        })

        localStorage.setItem('user', JSON.stringify(dataUser))

    } catch (error) {
        console.log(error)
        dispatch({
            type: USER_ERROR
        })
    }
}

// export const editProfilePictureAction = (newImage) => async(dispatch, getState) => {

//     dispatch({
//         type: USER_LOADING
//     })

//     // const {user} = getState().user

//     try {

//         const {user} = getState().user

//         const imageRef = await storage.ref().child(user.email).child('Profile picture')
//         await imageRef.put(newImage)
//         const imageURL = await imageRef.getDownloadURL()

//         await db.collection('users').doc(user.email).update({
//             photoURL: imageURL
//         })

//         const dataUser = {
//             ...user,
//             photoURL: imageURL
//         }

//         dispatch({
//             type: USER_SUCCESS,
//             payload: dataUser
//         })

//         localStorage.setItem('user', JSON.stringify(dataUser))
        
//     } catch (error) {
//         console.log(error)
//     }
// }

