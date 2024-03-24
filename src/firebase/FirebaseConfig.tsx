import jsonData from "./firebase_config.json";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: jsonData.apiKey,
    authDomain: jsonData.authDomain,
    projectId: jsonData.projectId,
    storageBucket: jsonData.storageBucket,
    messagingSenderId: jsonData.messagingSenderId,
    appId: jsonData.appId,
    measurementId: jsonData.measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;