import { onValue, ref, set } from "firebase/database";

import { database } from "~/utils/firebase";

type ClipboardData = {
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
  onValue(clipboardDataRef, (snapshot: any) => {
    console.log("on value being called");
    const data = snapshot.val();
    console.log("on value data: ", data);
    clipboardData = data;
  });
  return clipboardData;
}
