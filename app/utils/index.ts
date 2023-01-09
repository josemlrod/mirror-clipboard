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
  readClipboardData,
  subscribeToClipboardDataChanges,
  writeClipboardData,
} from "~/utils/database";

export {
  type ClipboardData,
  createUser,
  DEFAULT_THEME,
  getErrorMessage,
  getPreferredTheme,
  getThemeProps,
  isDarkTheme,
  readClipboardData,
  signInUser,
  subscribeToClipboardDataChanges,
  Theme,
  writeClipboardData,
};
