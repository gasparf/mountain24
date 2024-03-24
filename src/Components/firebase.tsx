// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import { ref, getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBjV4g5iv-z5XiLGjndxEfqASHRbyFwa8k",

  authDomain: "mountainmadness2024.firebaseapp.com",

  projectId: "mountainmadness2024",

  storageBucket: "mountainmadness2024.appspot.com",

  messagingSenderId: "625586408241",

  appId: "1:625586408241:web:0dad2ef7b9a80b75267e10",

  measurementId: "G-ZXCSMK1Y13"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const storage = getStorage();
const storageRef = ref(storage);
