// import axios from 'axios'
import { db, storage } from '../firebase'

// constant
const dataInicial = {
    noMoreData: null,
    redirect: null,
    hasToUpdate: 0,
    loading: false,
    count: 0,
    hasLookedForData: false,
    results: []
}

const limit = 10;

// types
const RECIPIE_LOADING = 'RECIPIE_LOADING'
const RECIPIE_ERROR = 'RECIPIE_ERROR'
const GET_RECIPIES_SUCCESS = 'GET_RECIPIES_SUCCESS'
const ADD_RECIPIE_SUCCESS = 'ADD_RECIPIE_SUCCESS'
const UPDATE_RECIPIE_SUCCESS = 'UPDATE_RECIPIE_SUCCESS'
const DELETE_RECIPIE_SUCCESS = 'DELETE_RECIPIE_SUCCESS'
const RECIPIES_NO_MORE_LEFT = 'RECIPIES_NO_MORE_LEFT'

// reducer
export default function userReducer(state = dataInicial, action) {
    switch (action.type) {
        case RECIPIE_LOADING:
            return { ...state, loading: true }
        case GET_RECIPIES_SUCCESS:
            return { ...state, loading: false, results: action.payload, count: action.payload.length, hasLookedForData: true }
        case ADD_RECIPIE_SUCCESS:
            return { ...state, loading: false, redirect: true }
        case DELETE_RECIPIE_SUCCESS:
            return { ...state, loading: false, hasToUpdate: state.hasToUpdate + 1 }
        case UPDATE_RECIPIE_SUCCESS:
            return { ...state, loading: false, hasToUpdate: state.hasToUpdate + 1 }
        case RECIPIE_ERROR:
            return { ...state, loading: false }
        case RECIPIES_NO_MORE_LEFT:
            return { ...state, noMoreData: true, loading: false }
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
        const docs = await db.collection('recipies').where("uid", "==", user.email).orderBy("date", "desc").limit(limit).get()

        // //Get owners of that recipies
        // await Promise.all(docs.docs.map(async (doc) => {
        //     let data = doc.data();
        //     const user = await db.collection('users').doc(data.uid).get()
        //     let dataUser = user.data();
        //     data = { ...data, id: doc.id, user: dataUser };
        //     arrayOfRecipies.push(data);
        // }));

        // for (let i = 0; i < docs.docs.length; i++) {
        //     const doc = docs.docs[i];
        //     let data = doc.data();
        //     const user = await db.collection('users').doc(data.uid).get()
        //     let dataUser = user.data();
        //     data = { ...data, id: doc.id, user: dataUser };
        //     arrayOfRecipies.push(data);
        // }
        const array = await processRecipies(docs, user);
        arrayOfRecipies.push(...array);

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

// action
export const getMoreMyRecipies = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })

    const { user } = getState().user
    const arrayOfRecipies = getState().recipie.results;
    try {
        const lastRecipie = await db.collection('recipies').doc(arrayOfRecipies[arrayOfRecipies.length - 1].id).get();
        const docs = await db.collection('recipies').where("uid", "==", user.email).orderBy("date", "desc").startAfter(lastRecipie).limit(limit).get()

        if (docs.docs.length === 0) {
            dispatch({
                type: RECIPIES_NO_MORE_LEFT
            })
            return;
        }

        // for (let i = 0; i < docs.docs.length; i++) {
        //     const doc = docs.docs[i];
        //     let data = doc.data();
        //     const user = await db.collection('users').doc(data.uid).get()
        //     let dataUser = user.data();
        //     data = { ...data, id: doc.id, user: dataUser };
        //     arrayOfRecipies.push(data);
        // }
        const array = await processRecipies(docs, user);
        arrayOfRecipies.push(...array);

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

    try {
        const arrayOfRecipies = [];
        let docs = null;
        const { user } = getState().user;

        docs = await db.collection('recipies').limit(limit).orderBy("date", "desc").get();
        const array = await processRecipies(docs, user);
        arrayOfRecipies.push(...array);

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

export const getMoreRecipies = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })
    // .startAt(1000000)
    // .limit(3)
    const arrayOfRecipies = getState().recipie.results;
    const { user } = getState().user
    try {
        const lastRecipie = await db.collection('recipies').doc(arrayOfRecipies[arrayOfRecipies.length - 1].id).get();
        const docs = await db.collection('recipies').orderBy("date", "desc").startAfter(lastRecipie).limit(limit).get();

        console.log(docs.docs.length === 0)

        if (docs.docs.length === 0) {
            dispatch({
                type: RECIPIES_NO_MORE_LEFT
            })
            return;
        }

        // for (let i = 0; i < docs.docs.length; i++) {
        //     const doc = docs.docs[i];
        //     let data = doc.data();
        //     const user = await db.collection('users').doc(data.uid).get()
        //     let dataUser = user.data();
        //     data = { ...data, id: doc.id, user: dataUser };
        //     arrayOfRecipies.push(data);
        // }
        const array = await processRecipies(docs, user);
        arrayOfRecipies.push(...array);

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

export const getFavouritesRecipies = () => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })

    try {
        const arrayOfRecipies = [];
        let docs = null;
        const { user } = getState().user

        // docs = await db.collection('recipies').orderBy("date", "desc").get();
        const array = await processFavouritesRecipies(user);
        arrayOfRecipies.push(...array);

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

// export const getMoreFavouritesRecipies = () => async (dispatch, getState) => {
//     dispatch({
//         type: RECIPIE_LOADING
//     })
//     // .startAt(1000000)
//     // .limit(3)
//     const arrayOfRecipies = getState().recipie.results;
//     try {
//         const lastRecipie = await db.collection('recipies').doc(arrayOfRecipies[arrayOfRecipies.length - 1].id).get();
//         const docs = await db.collection('recipies').orderBy("date", "desc").startAfter(lastRecipie).limit(limit).get();

//         console.log(docs.docs.length === 0)

//         if (docs.docs.length === 0) {
//             dispatch({
//                 type: RECIPIES_NO_MORE_LEFT
//             })
//             return;
//         }

//         const array = await processFavouritesRecipies(docs);
//         arrayOfRecipies.push(...array);

//         dispatch({
//             type: GET_RECIPIES_SUCCESS,
//             payload: arrayOfRecipies
//         })

//     } catch (error) {
//         console.log("Error getting documents: ", error);
//         dispatch({
//             type: RECIPIE_ERROR
//         })
//     }

// }



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

export const getSearchedRecipies = (search) => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })

    try {
        const arrayOfRecipies = [];
        if (search && search !== "") {
            //Get all the recipies
            const docs = await db.collection('recipies').get();

            //Get owners of that recipies
            await Promise.all(docs.docs.map(async (doc) => {
                let data = doc.data();
                const user = await db.collection('users').doc(data.uid).get()
                let dataUser = user.data();
                const favourite = await db.collection('favourites_users_recipies').where("uid", "==", dataUser.email).where("rid", "==", doc.id).get()
                data = { ...data, id: doc.id, user: dataUser, favourite: !favourite.empty };

                if (match(data, search)) {
                    arrayOfRecipies.push(data);
                }

            }));
        }

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

export const favouriteRecipie = (recipie) => async (dispatch, getState) => {
    dispatch({
        type: RECIPIE_LOADING
    })

    try {

        const { user } = getState().user;

        if (recipie.favourite) {
            const docs = await db.collection("favourites_users_recipies")
                .where("uid", "==", user.email)
                .where("rid", "==", recipie.id)
                .get();
            const id = docs.docs[0].id;
            db.collection("favourites_users_recipies").doc(id)
                .delete()
                .then(function () {
                    console.log("Document successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing document: ", error);
                });
        }
        else {
            db.collection("favourites_users_recipies").add({
                uid: user.email,
                rid: recipie.id
            })
                .then(function () {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }


        dispatch({
            type: UPDATE_RECIPIE_SUCCESS
        })

    } catch (error) {
        console.log("Error getting documents: ", error);
        dispatch({
            type: RECIPIE_ERROR
        })
    }
}


const match = (data, search) => {
    return data.user.email.toLowerCase().includes(search.toLowerCase().trim())
        || data.user.displayName.toLowerCase().includes(search.toLowerCase().trim())
        || data.name.toLowerCase().includes(search.toLowerCase().trim())
        || data.description.toLowerCase().includes(search.toLowerCase().trim())
}

const processRecipies = async (docs, u) => {
    try {
        const array = [];

        for (let i = 0; i < docs.docs.length; i++) {
            const doc = docs.docs[i];
            let data = doc.data();
            const user = await db.collection('users').doc(data.uid).get()
            let dataUser = user.data();

            if(u){
                const favourite = await db.collection('favourites_users_recipies').where("uid", "==", u.email).where("rid", "==", doc.id).get()
                data = { ...data, id: doc.id, user: dataUser, favourite: !favourite.empty };
            }
            else{
                data = { ...data, id: doc.id, user: dataUser };
            }
            
            array.push(data);
        }
        return array;

    } catch (error) {
        console.log(error)
    }
}

const processFavouritesRecipies = async (u) => {
    try {
        const array = [];

        const docs = await db.collection('favourites_users_recipies').where("uid", "==", u.email).get()


        await Promise.all(docs.docs.map(async (doc) => {
            let data = doc.data();

            const recipie = await db.collection('recipies').doc(data.rid).get();
            const recipieData = recipie.data();

            const user = await db.collection('users').doc(recipieData.uid).get()
            let dataUser = user.data();

            data = { ...recipieData, id: data.rid, user: dataUser, favourite: true };
            array.push(data);
        }));

        // for (let i = 0; i < docs.docs.length; i++) {
        //     const doc = docs.docs[i];
        //     let data = doc.data();

        //     const recipie = await db.collection('recipies').doc(data.rid).get();
        //     const recipieData = recipie.data();

        //     const user = await db.collection('users').doc(recipieData.uid).get()
        //     let dataUser = user.data();

        //     data = { ...recipieData, id: data.rid, user: dataUser, favourite: true };
        //     array.push(data);

        // }
        return array;

    } catch (error) {
        console.log(error)
    }
} 