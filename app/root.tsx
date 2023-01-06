import { json, type MetaFunction } from "@remix-run/node";
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
import { isDarkTheme } from "~/utils";

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
  const data = session.has("theme")
    ? { theme: session.get("theme") }
    : { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function App() {
  const { theme } = useLoaderData();
  const darkModeClassName = (isDarkTheme(theme) && "dark") || "";

  return (
    <html className={darkModeClassName} lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
