import firebase from "firebase";
import "firebase/storage";

const {
  REACT_APP_apiKey,
  REACT_APP_authDomain,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
  REACT_APP_messagingSenderId,
  REACT_APP_appId,
  REACT_APP_measurementId,
} = process.env;

//UPDATE FIREBASE API HERE
const firebaseApp = firebase.initializeApp({
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
  measurementId: REACT_APP_measurementId,
});

// const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, storage };
export default auth;
