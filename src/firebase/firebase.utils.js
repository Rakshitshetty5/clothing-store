import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAu-Hy-s-kNj_vTqQwoLpniq9xmDX6awFo",
    authDomain: "clothing-store-31464.firebaseapp.com",
    databaseURL: "https://clothing-store-31464.firebaseio.com",
    projectId: "clothing-store-31464",
    storageBucket: "clothing-store-31464.appspot.com",
    messagingSenderId: "437149512658",
    appId: "1:437149512658:web:f1de25b329c2ce70bace0b",
    measurementId: "G-EWCQBKNGZY"
  };


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;