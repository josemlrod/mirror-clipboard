import { ref, child, get, set } from "firebase/database";

import { database } from "~/utils/firebase";
import { getDbPath } from "~/utils/constants";
import { getErrorMessage } from "./tryError";

export type ClipboardData = {
  data: string;
} | void;

export type LinkData = {
  id: string;
  linkAddress: FormDataEntryValue;
  linkName: FormDataEntryValue;
};

export async function deleteLink(id: string, userId: string) {
  try {
    const links = await readClipboardData(userId);
    const newLinks = links.filter((link: LinkData) => {
      return link.id !== id;
    });
    set(ref(database, getDbPath(userId)), newLinks);
    return {
      success: true,
    };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

export async function readClipboardData(userId: string) {
  const databaseRef = ref(database);
  try {
    const snapshot = await get(child(databaseRef, getDbPath(userId)));

    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    }

    return [];
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}

export async function writeClipboardData(payload: LinkData, userId: string) {
  const oldData = await readClipboardData(userId);
  const data = (oldData.length && [...oldData, payload]) || [payload];
  try {
    set(ref(database, getDbPath(userId)), data);
    return {
      success: 200,
    };
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}
