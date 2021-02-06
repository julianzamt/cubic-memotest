import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyA38DFwyoNIzTlbPBKvbJL-7vcaNyBrfpw",
    authDomain: "cubic-memotest.firebaseapp.com",
    projectId: "cubic-memotest",
    storageBucket: "cubic-memotest.appspot.com",
    messagingSenderId: "1008229769730",
    appId: "1:1008229769730:web:a09d7db4d42e4a0a13fd1b",
    measurementId: "G-X3SEPQ1RH6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
firebase.auth = firebase.auth();

firebase.db = db;

export default firebase