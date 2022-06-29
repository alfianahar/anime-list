import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA65roe6sAWpy8aszw7Nu-87E5pXk_hNHk",
    authDomain: "anizoune-animelist.firebaseapp.com",
    projectId: "anizoune-animelist",
    storageBucket: "anizoune-animelist.appspot.com",
    messagingSenderId: "159874225555",
    appId: "1:159874225555:web:a74be60a5e17468e318466",
    measurementId: "G-MXRWTY3KYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)