import {
  DEFAULT_THEME,
  getPreferredTheme,
  getThemeProps,
  isDarkTheme,
  Theme,
} from "~/utils/theme";
import { getErrorMessage } from "~/utils/tryError";
import {
  type ClipboardData,
  type LinkData,
  deleteLink,
  readClipboardData,
  readUserData,
  writeClipboardData,
} from "~/utils/database";
import { auth, database } from "~/utils/firebase";
import {
  createUser,
  getUserIdSession,
  loginUser,
  removeUserIdSession,
  saveUserIdSession,
} from "./auth";
import { addDropdownWindowClickListener } from "./dropdown";

export {
  type ClipboardData,
  type LinkData,
  addDropdownWindowClickListener,
  auth,
  createUser,
  database,
  deleteLink,
  DEFAULT_THEME,
  getErrorMessage,
  getPreferredTheme,
  getThemeProps,
  getUserIdSession,
  isDarkTheme,
  loginUser,
  readClipboardData,
  readUserData,
  removeUserIdSession,
  saveUserIdSession,
  Theme,
  writeClipboardData,
};
