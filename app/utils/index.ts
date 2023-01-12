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
  writeClipboardData,
} from "~/utils/database";
import { auth, database } from "~/utils/firebase";
import {
  createUser,
  getUserIdSession,
  loginUser,
  saveUserIdSession,
} from "./auth";

export {
  type ClipboardData,
  type LinkData,
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
  saveUserIdSession,
  Theme,
  writeClipboardData,
};
