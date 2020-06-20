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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }
    catch(error){
      console.log(error)
    }
  }

  return userRef;
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj)
  });
  return await batch.commit() 
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName : encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  //console.log(transformedCollection);
    
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator
  }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;