import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "~/utils/firebase";
import { getErrorMessage } from "~/utils/tryError";

type User = {
  createdAt: string;
  email: string;
  name: string;
  password: string;
};

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
