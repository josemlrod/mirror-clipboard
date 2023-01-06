export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const DEFAULT_THEME = Theme.LIGHT;

const PREFERS_DARK_MQ = "(prefers-color-scheme: dark)";
export function getPreferredTheme() {
  if (typeof window !== "object") {
    return null;
  }

  return window.matchMedia(PREFERS_DARK_MQ).matches ? Theme.DARK : Theme.LIGHT;
}

export function isDarkTheme(theme: Theme) {
  return theme === Theme.DARK;
}

export function getThemeProps(theme: Theme | void) {
  const selectedTheme = theme || getPreferredTheme();
  return (
    selectedTheme && {
      themeButtonIcon: isDarkTheme(selectedTheme) ? "🌝" : "🌞",
      themeButtonValue: isDarkTheme(selectedTheme) ? "light" : "dark",
    }
  );
}
