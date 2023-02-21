import firebase from '@firebase/app';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBEqCaxQHQbIXn4pkkLR4-uhlUuV0xVhHo",
    authDomain: "todo-83bbe.firebaseapp.com",
    projectId: "todo-83bbe",
    storageBucket: "todo-83bbe.appspot.com",
    messagingSenderId: "541667099995",
    appId: "1:541667099995:web:8fdfc898c73ea7f8f6467e",
    measurementId: "G-867R2VFPCY"
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();

