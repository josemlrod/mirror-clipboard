import { onValue, ref, set } from "firebase/database";
import { redirect } from "@remix-run/node";

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

export function subscribeToClipboardDataChanges(): ClipboardData {
  let clipboardData;

  const clipboardDataRef = ref(database, "clipboard/only");
  onValue(clipboardDataRef, (snapshot: any): void => {
    clipboardData = snapshot.val();
    redirect("/");
  });

  return clipboardData;
}
