import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDyrPVv9SI7tHd1TGcT23s6A2HOByOCxtA",
  authDomain: "chatapp-3da21.firebaseapp.com",
  projectId: "chatapp-3da21",
  storageBucket: "chatapp-3da21.appspot.com",
  messagingSenderId: "415145317814",
  appId: "1:415145317814:web:3087b9298ec89c66dd9d17"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;