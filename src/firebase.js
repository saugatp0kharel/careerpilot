// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG9YfyuK28NOWGgyArcKwxwM0lQIHqB8Q",
  authDomain: "careerpilot-f799e.firebaseapp.com",
  projectId: "careerpilot-f799e",
  storageBucket: "careerpilot-f799e.firebasestorage.app",
  messagingSenderId: "850646736432",
  appId: "1:850646736432:web:c5cf00a85387dfb9fcd7f5",
  measurementId: "G-CDH8EPVM7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);