import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBa3EE6TQz0LEd_wmakMKLs-puSnb7eDXY",
  authDomain: "linkedin-clone-ced55.firebaseapp.com",
  projectId: "linkedin-clone-ced55",
  storageBucket: "linkedin-clone-ced55.appspot.com",
  messagingSenderId: "351040519527",
  appId: "1:351040519527:web:80da557a4e30fa8ea303c2",
  measurementId: "G-2TPW2YG7ES",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); //this connects the entire react app to the backend (firebase)
const db = firebaseApp.firestore(); //establish connection to database to firebase database
const auth = firebase.auth(); //create authentication for your app with firebase.

export { db, auth };
