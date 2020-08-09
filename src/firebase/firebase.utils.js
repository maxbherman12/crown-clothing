import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCxxYWubhjYIsSakes-N0BJ2AHZfSBSnDE",
    authDomain: "crwn-db-f21bd.firebaseapp.com",
    databaseURL: "https://crwn-db-f21bd.firebaseio.com",
    projectId: "crwn-db-f21bd",
    storageBucket: "crwn-db-f21bd.appspot.com",
    messagingSenderId: "454401397281",
    appId: "1:454401397281:web:eb44581827357fe609c960",
    measurementId: "G-HEPDS2H1XV"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    
    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;