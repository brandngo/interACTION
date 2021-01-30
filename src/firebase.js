import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcf3x1qfzLbBZa2DwmNiRj6VczPW7sPNo",
  authDomain: "interactivess.firebaseapp.com",
  projectId: "interactivess",
  storageBucket: "interactivess.appspot.com",
  messagingSenderId: "217934856880",
  appId: "1:217934856880:web:9096af81db374c213e7175",
  measurementId: "G-0S15JCSS67"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;