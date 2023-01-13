// action types
export const COPY_TO_CLIPBOARD: string = "copy_to_clipboard";
export const DELETE_LINK: string = "delete_link";
export const LOG_IN: string = "log_in";
export const LOG_OUT: string = "log_out";
export const SAVE_CLIPBOARD: string = "save_clipboard";
export const SAVE_LINK: string = "save_link";
export const SIGN_UP: string = "sign_up";
export const THEME_SWITCHER: string = "theme_switcher";

export const getDbPath = (userId: string): string => `clipboard/${userId}`;
export const USER_DB_PATH: string = "users/";
export const THEME: string = "theme";
