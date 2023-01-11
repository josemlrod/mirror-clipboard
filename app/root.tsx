import { json, redirect, type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "~/styles/app.css";
import { getSession, commitSession } from "~/sessions";
import { DEFAULT_THEME, getThemeProps, isDarkTheme, Theme } from "~/utils";
import { THEME, THEME_SWITCHER } from "./utils/constants";
import { AppLayout } from "./components/AppLayout";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Mirror Clipboard",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const theme = session.has(THEME)
    ? { ...getThemeProps(session.get(THEME)) }
    : { ...getThemeProps(DEFAULT_THEME) };
  const data = { ...theme };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const formDataObject = Object.fromEntries(form);
  const { _action, ...values } = formDataObject;

  switch (_action) {
    case THEME_SWITCHER:
      const { theme } = values;
      session.set(THEME, theme);

      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });
  }
}

export default function App() {
  const { themeButtonIcon, themeButtonValue } = useLoaderData();
  const darkModeClassName = (isDarkTheme(themeButtonValue) && Theme.DARK) || "";

  return (
    <html className={darkModeClassName} lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppLayout
          themeButtonIcon={themeButtonIcon}
          themeButtonValue={themeButtonValue}
        >
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </AppLayout>
      </body>
    </html>
  );
}
