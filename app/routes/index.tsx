import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "~/sessions";
import {
  DEFAULT_THEME,
  getThemeProps,
  subscribeToClipboardDataChanges,
  writeClipboardData,
} from "~/utils";

export async function loader({ request }: { request: Request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const theme = session.has("theme")
    ? { ...getThemeProps(session.get("theme")) }
    : { ...getThemeProps(DEFAULT_THEME) };

  const { data: clipboardContent } = subscribeToClipboardDataChanges() || {};

  const data = {
    ...theme,
    clipboardContent,
  };

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
    case "themeSwitcher":
      const { theme } = values;
      session.set("theme", theme);

      return redirect("/", {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      });

    case "saveClipboard":
      const { clipboardContent } = values;
      return writeClipboardData(clipboardContent);
  }
}

export default function Index() {
  const data = useLoaderData();
  const { clipboardContent, themeButtonIcon, themeButtonValue } = data;

  return (
    <div className="dark:bg-zinc-900 h-screen">
      {/* <-- Navbar --> */}
      <nav
        aria-label="Site Nav"
        className="mx-auto flex max-w-3xl items-center justify-between p-4"
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
            <button name="_action" value="themeSwitcher">
              {themeButtonIcon}
            </button>
          </Form>
        </span>
      </nav>

      {/* <-- section --> */}
      <section>
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 lg:items-center lg:gap-x-16 justify-items-center">
            <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-center">
              <h2 className="text-3xl font-bold sm:text-4xl dark:text-gray-50">
                Share your links
              </h2>
              <span className="text-m font-bold sm:text-l text-gray-500 dark:text-gray-200">
                (and files too, soon)
              </span>

              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Have you ever had two systems with different operating systems,
                and wanted to share links between them? (or even files?). This
                app is for you. Share links from your Mac to your PC, and from
                your iPhone, to your Android device or from your mobile device
                to your PC!
              </p>
              <Form method="post">
                <textarea
                  className="mt-4 w-full h-80 border-gray-500	rounded-lg border bg-gray-100 dark:bg-zinc-700 dark:text-white p-1"
                  id="clipboardContent"
                  name="clipboardContent"
                  // value={clipboardContent}
                >
                  {clipboardContent}
                </textarea>
                <button
                  className="border-gray-500 font-bold	rounded-lg border bg-gray-100 px-2 py-1 dark:text-gray-50 dark:bg-zinc-700"
                  name="_action"
                  value="saveClipboard"
                >
                  Save
                </button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
