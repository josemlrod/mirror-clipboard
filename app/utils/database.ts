import { ref, child, get, set } from "firebase/database";

import { database } from "~/utils/firebase";
import { DB_PATH } from "~/utils/constants";
import { getErrorMessage } from "./tryError";

export type ClipboardData = {
  data: string;
} | void;

export type LinkData = {
  id: string;
  linkAddress: FormDataEntryValue;
  linkName: FormDataEntryValue;
};

export async function writeClipboardData(payload: LinkData) {
  const oldData = await readClipboardData();
  const data = (oldData.length && [...oldData, payload]) || [payload];
  try {
    set(ref(database, DB_PATH), data);
    return {
      success: 200,
    };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

export async function readClipboardData() {
  const databaseRef = ref(database);
  try {
    const snapshot = await get(child(databaseRef, DB_PATH));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    }

    return [];
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}
