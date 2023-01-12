import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, child, get, set } from "firebase/database";

import { auth, database, getErrorMessage } from "~/utils";
import { USER_DB_PATH } from "./constants";

type CreateUserProps = {
  email: FormDataEntryValue;
  name: FormDataEntryValue;
  password: FormDataEntryValue;
};

type LoginUserProps = Omit<CreateUserProps, "name">;

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
      success: true,
    };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

export async function loginUser({ email, password }: LoginUserProps) {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      (typeof email === "string" && email) || "",
      (typeof password === "string" && password) || ""
    );
    return { data: user, success: true };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}
