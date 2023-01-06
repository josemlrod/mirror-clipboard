import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getErrorMessage } from "./tryError";

type User = {
  createdAt: string;
  email: string;
  name: string;
  password: string;
};

const firebaseConfig = {
  apiKey: "AIzaSyCVvgNc2gSuixI9CaLv8XL66ghf5PhnSBo",
  authDomain: "mirror-clipboard.firebaseapp.com",
  projectId: "mirror-clipboard",
  storageBucket: "mirror-clipboard.appspot.com",
  messagingSenderId: "675901679147",
  appId: "1:675901679147:web:43724abd5a95e8363c6c6e",
  measurementId: "G-F2EE4MFVHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export async function createUser({ createdAt, email, name, password }: User) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (e: unknown) {
    const errorMessage = getErrorMessage(e);
  }
}

export async function signInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: unknown) {
    const errorMessage = getErrorMessage(e);
  }
}
