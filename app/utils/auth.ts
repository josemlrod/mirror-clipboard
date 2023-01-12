import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { json } from "@remix-run/node";

import { auth, database, getErrorMessage } from "~/utils";
import { USER_DB_PATH } from "./constants";
import { commitSession, getSession } from "~/sessions";

type CreateUserProps = {
  email: FormDataEntryValue;
  name: FormDataEntryValue;
  password: FormDataEntryValue;
};

type LoginUserProps = Omit<CreateUserProps, "name">;

export async function getUserIdSession({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  return (session.has("userId") && session.get("userId")) || null;
}

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

export async function saveUserIdSession({
  request,
  userId,
}: {
  request: Request;
  userId: string;
}) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", userId);
  return json(null, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
