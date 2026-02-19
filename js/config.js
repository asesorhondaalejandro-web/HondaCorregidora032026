// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpgIHTnvsmM_412DXzHCdBIrBka27nHsM",
  authDomain: "honda-crm-system-5.firebaseapp.com",
  projectId: "honda-crm-system-5",
  storageBucket: "honda-crm-system-5.firebasestorage.app",
  messagingSenderId: "757473218168",
  appId: "1:757473218168:web:b8ec39aa8ce5281f99278d",
  measurementId: "G-46D81G5X5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);