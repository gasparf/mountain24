import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    "apiKey": "AIzaSyBjV4g5iv-z5XiLGjndxEfqASHRbyFwa8k",
    "authDomain": "mountainmadness2024.firebaseapp.com",
    "projectId": "mountainmadness2024",
    "storageBucket": "mountainmadness2024.appspot.com",
    "messagingSenderId": "625586408241",
    "appId": "1:625586408241:web:0dad2ef7b9a80b75267e10",
    "measurementId": "G-ZXCSMK1Y13"
}

const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app);

export { imgDB };