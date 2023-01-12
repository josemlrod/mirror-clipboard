import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, child, get, set } from "firebase/database";

import { auth, database, getErrorMessage } from "~/utils";
import { USER_DB_PATH } from "./constants";

type CreateUserProps = {
  email: FormDataEntryValue;
  name: FormDataEntryValue;
  password: FormDataEntryValue;
};

export async function createUser({ email, name, password }: CreateUserProps) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      (typeof email === "string" && email) || "",
      (typeof password === "string" && password) || ""
    );
    set(ref(database, USER_DB_PATH), { email, name });
    return {
      data: user,
      success: 200,
    };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

/**
 * createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
 */
