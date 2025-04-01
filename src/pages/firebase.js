// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3hi3moaeAwKQU25E5mIxZZzZqiKu_WR8",
    authDomain: "chattapp-847e6.firebaseapp.com",
    projectId: "chattapp-847e6",
    storageBucket: "chattapp-847e6.appspot.com",
    messagingSenderId: "61279506686",
    appId: "1:61279506686:web:7daf728ab1ae4eb42bd5af",
    measurementId: "G-GBCXCE9TQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyD3hi3moaeAwKQU25E5mIxZZzZqiKu_WR8",
//     authDomain: "chattapp-847e6.firebaseapp.com",
//     projectId: "chattapp-847e6",
//     storageBucket: "chattapp-847e6.firebasestorage.app",
//     messagingSenderId: "61279506686",
//     appId: "1:61279506686:web:7daf728ab1ae4eb42bd5af",
//     measurementId: "G-GBCXCE9TQ5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);