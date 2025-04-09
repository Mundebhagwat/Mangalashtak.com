// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ ADD THIS

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3hi3moaeAwKQU25E5mIxZZzZqiKu_WR8",
    authDomain: "chattapp-847e6.firebaseapp.com",
    projectId: "chattapp-847e6",
    storageBucket: "chattapp-847e6.appspot.com",
    messagingSenderId: "61279506686",
    appId: "1:61279506686:web:7daf728ab1ae4eb42bd5af",
    measurementId: "G-GBCXCE9TQ5",
    databaseURL: "https://chattapp-847e6-default-rtdb.firebaseio.com" // ✅ ADD THIS
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const firestore = getFirestore(app);
const database = getDatabase(app); // ✅ ADD THIS
const auth = getAuth(app);

export { firestore, auth, app, messaging, database, getToken, onMessage };

