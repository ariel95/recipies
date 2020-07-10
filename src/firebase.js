import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDHv0UZh-ZEh2ItdrOFFkyGUoItBpBs3m4",
    authDomain: "recipies-91cf8.firebaseapp.com",
    databaseURL: "https://recipies-91cf8.firebaseio.com",
    projectId: "recipies-91cf8",
    storageBucket: "recipies-91cf8.appspot.com",
    messagingSenderId: "313303212757",
    appId: "1:313303212757:web:e22516b2f79cd98b3a785c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore()
  const storage = firebase.storage()


  export {auth, db, firebase, storage}