import { ref, child, get, set } from "firebase/database";

import { database } from "~/utils/firebase";

export type ClipboardData = {
  data: string;
} | void;

export function writeClipboardData(payload: FormDataEntryValue) {
  try {
    set(ref(database, "clipboard/only"), {
      data: payload,
    });
    return {
      success: 200,
    };
  } catch (e) {
    return {
      failure: 400,
      cause: e,
    };
  }
}

export async function readClipboardData() {
  const databaseRef = ref(database);
  try {
    const snapshot = await get(child(databaseRef, "clipboard/only"));
    const clipboardData = (snapshot.exists() && snapshot.val()) || "";
    return clipboardData;
  } catch (e) {
    console.error(e);
  }
}
