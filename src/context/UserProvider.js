import React from 'react'
import {auth, db, firebase } from '../firebase'

export const UserContext = React.createContext();

const UserProvider = (props) => {

    const initialData = { uid:null, email: null, active: null, rol: null}

    const [user, setUser] = React.useState(initialData);

    React.useEffect(() => {
        getActiveUser();
    }, [])

    const getActiveUser = async () => {
        try {
            auth.onAuthStateChanged(user => {
                if(user){
                    user.getIdTokenResult()
                    .then(idToken => {
                        console.log(idToken.claims.admin)
                        if(!!idToken.claims.admin){
                            setUser({
                                email: user.email,
                                uid: user.uid,
                                active: true,
                                rol: 'admin'
                            });
                        }
                        else if(!!idToken.claims.chef){
                            setUser({
                                email: user.email,
                                uid: user.uid,
                                active: true,
                                rol: 'chef'
                            });
                        }
                        else{
                            setUser({
                                email: user.email,
                                uid: user.uid,
                                active: true,
                                rol: 'guest'
                            });
                        }
                    })
                }
                else{
                    console.log('Sin usuario: ', user);
                    setUser({
                        email: null,
                        uid: null,
                        active: false,
                        rol: 'guest'
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const signIn = async () =>{
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const res = await auth.signInWithPopup(provider);

            const user = await db.collection('users').doc(res.user.email).get();

            if(!user.exists){
                await db.collection('users').doc(res.user.email).set({
                    uid: res.user.uid,
                    email: res.user.email,
                    rol: 'chef'
                })
            }


        } catch (error) {
            console.log(error);
        }
    }

    const signOut = () => {
        auth.signOut();
    }

    return (
        <UserContext.Provider value={{user, signIn, signOut}}>
            {props.children}
        </UserContext.Provider>
    )
}


export default UserProvider
