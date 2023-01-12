import {
  DEFAULT_THEME,
  getPreferredTheme,
  getThemeProps,
  isDarkTheme,
  Theme,
} from "~/utils/theme";
import { getErrorMessage } from "~/utils/tryError";
import { createUser, signInUser } from "~/utils/user";
import {
  type ClipboardData,
  type LinkData,
  deleteLink,
  readClipboardData,
  writeClipboardData,
} from "~/utils/database";
import { database } from "~/utils/firebase";

export {
  type ClipboardData,
  type LinkData,
  createUser,
  database,
  deleteLink,
  DEFAULT_THEME,
  getErrorMessage,
  getPreferredTheme,
  getThemeProps,
  isDarkTheme,
  readClipboardData,
  signInUser,
  Theme,
  writeClipboardData,
};
