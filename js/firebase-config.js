// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFAFXr3jIwBtiZV7qkkEsFU_GhwMqw8uA",
    authDomain: "task-management-system-90642.firebaseapp.com",
    projectId: "task-management-system-90642",
    storageBucket: "task-management-system-90642.appspot.com",
    messagingSenderId: "171496291404",
    appId: "1:171496291404:web:22405d69caf8097e9fc8e9",
    measurementId: "G-3VVDK0ZQRY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();