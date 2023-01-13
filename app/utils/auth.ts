import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { json, redirect } from "@remix-run/node";

import { auth, database, getErrorMessage, readUserData } from "~/utils";
import { USER_DB_PATH } from "./constants";
import { commitSession, getSession } from "~/sessions";

type CreateUserProps = {
  email: FormDataEntryValue;
  name: FormDataEntryValue;
  password: FormDataEntryValue;
};

type LoginUserProps = Omit<CreateUserProps, "name">;

export async function createUser({ email, name, password }: CreateUserProps) {
  try {
    const userData = await readUserData();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      (typeof email === "string" && email) || "",
      (typeof password === "string" && password) || ""
    );
    set(ref(database, USER_DB_PATH), [
      ...userData,
      { id: user.uid, email, name },
    ]);
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

export async function getUserIdSession({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = (session.has("userId") && session.get("userId")) || null;
  json(null, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
  return userId;
}

export async function removeUserIdSession({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("userId");
  return json(null, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export async function saveUserIdSession({
  redirectPath,
  request,
  userId,
}: {
  redirectPath: string;
  request: Request;
  userId: string;
}) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
