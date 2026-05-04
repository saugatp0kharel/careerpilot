import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDG9YfyuK28NOWGgyArcKwxwM0lQIHqB8Q",
  authDomain: "careerpilot-f799e.firebaseapp.com",
  projectId: "careerpilot-f799e",
  storageBucket: "careerpilot-f799e.appspot.com",
  messagingSenderId: "850646736432",
  appId: "1:850646736432:web:c5cf00a85387dfb9fcd7f5",
  measurementId: "G-CDH8EPVM7S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);