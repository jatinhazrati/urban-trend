import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyATZTvr3DAOoy6eJwqi4P65gseErfLSvrU",
  authDomain: "urban-trend-ca366.firebaseapp.com",
  databaseURL: "https://urban-trend-ca366.firebaseio.com",
  projectId: "urban-trend-ca366",
  storageBucket: "urban-trend-ca366.appspot.com",
  messagingSenderId: "192374891779",
  appId: "1:192374891779:web:5611e074da07cfd8e97536",
  measurementId: "G-CZEM7H9KL7"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
