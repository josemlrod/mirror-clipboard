export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export function isDarkTheme(theme: Theme) {
  return theme === Theme.DARK;
}

export function getThemeProps(theme: Theme | void) {
  return (
    theme && {
      themeButtonIcon: isDarkTheme(theme) ? "🌝" : "🌞",
      themeButtonValue: isDarkTheme(theme) ? "light" : "dark",
    }
  );
}
