import React from "react";
import { Form } from "@remix-run/react";

import { THEME_SWITCHER } from "~/utils/constants";

type Props = {
  children: JSX.Element[];
  themeButtonIcon: string;
  themeButtonValue: string;
};

export function AppLayout({
  children,
  themeButtonIcon,
  themeButtonValue,
}: Props): JSX.Element {
  return (
    <div className="dark:bg-zinc-900 h-screen">
      <nav
        aria-label="Site Nav"
        className="dark:bg-zinc-900 w-screen mx-auto flex max-w-3xl items-center justify-between p-4"
      >
        <a
          href="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-700"
        >
          <span className="sr-only">Logo</span>
          👋
        </a>

        <ul className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-100 font-bold">
          <li>
            <a className="rounded-lg px-3 py-2" href="/">
              Mirror Clipboard
            </a>
          </li>
        </ul>

        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-zinc-700">
          <span className="sr-only">Logo</span>
          <Form method="post">
            <input
              className="hidden"
              name="theme"
              value={themeButtonValue}
              readOnly
            />
            <button name="_action" value={THEME_SWITCHER}>
              {themeButtonIcon}
            </button>
          </Form>
        </span>
      </nav>
      <main>{children}</main>
    </div>
  );
}
