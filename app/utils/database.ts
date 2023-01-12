import { ref, child, get, set } from "firebase/database";

import { database } from "~/utils/firebase";
import { DB_PATH } from "./constants";

export type ClipboardData = {
  data: string;
} | void;

export type LinkData = {
  linkAddress: string;
  linkName: string;
};

export async function writeClipboardData(payload: LinkData) {
  const { data: existingData } = await readClipboardData();
  const data = (existingData && [...existingData, payload]) || [payload];
  try {
    set(ref(database, DB_PATH), {
      data,
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
    const snapshot = await get(child(databaseRef, DB_PATH));
    const clipboardData = (snapshot.exists() && snapshot.val()) || "";
    return clipboardData;
  } catch (e) {
    console.error(e);
  }
}
