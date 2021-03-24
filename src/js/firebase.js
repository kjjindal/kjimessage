import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBrB2U6V6o16LH-lc1EKPX7Yz-vMZWBSKA",
    authDomain: "kjimessage1999.firebaseapp.com",
    projectId: "kjimessage1999",
    storageBucket: "kjimessage1999.appspot.com",
    messagingSenderId: "1023482213684",
    appId: "1:1023482213684:web:b6b5b924ca1467f9f6e161",
    measurementId: "G-Y93X9Z2XTY"
  };



const firebaseapp=firebase.initializeApp(firebaseConfig)
const db =firebaseapp.firestore();
const auth=firebase.auth();
const provider=new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage();
export {db,auth,provider,storage}