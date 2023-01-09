import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCVvgNc2gSuixI9CaLv8XL66ghf5PhnSBo",
  authDomain: "mirror-clipboard.firebaseapp.com",
  databaseURL: "https://mirror-clipboard-default-rtdb.firebaseio.com",
  projectId: "mirror-clipboard",
  storageBucket: "mirror-clipboard.appspot.com",
  messagingSenderId: "675901679147",
  appId: "1:675901679147:web:43724abd5a95e8363c6c6e",
  measurementId: "G-F2EE4MFVHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
