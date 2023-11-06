// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3qzCxo-g0ITNUIKvldjoUDPHHYEa1cY8",
    authDomain: "zayyid-personal.firebaseapp.com",
    projectId: "zayyid-personal",
    storageBucket: "zayyid-personal.appspot.com",
    messagingSenderId: "290281875039",
    appId: "1:290281875039:web:25dbc98bf211d6600e9dea",
    measurementId: "G-5KWEC2D0DK"
};

// Initialize Firebase
const fbConfig = initializeApp(firebaseConfig);

export default fbConfig;
