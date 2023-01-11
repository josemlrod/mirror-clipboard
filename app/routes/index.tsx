import React from "react";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { ref, onValue } from "firebase/database";

import { database, readClipboardData, writeClipboardData } from "~/utils";
import { DB_PATH, SAVE_CLIPBOARD } from "~/utils/constants";
import { LinkCard } from "~/components/LinkCard";

export async function loader({ request }: { request: Request }) {
  const { data: clipboardContent } = await readClipboardData();

  const data = {
    clipboardContent,
  };

  return json(data);
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const formDataObject = Object.fromEntries(form);
  const { _action, ...values } = formDataObject;

  switch (_action) {
    case SAVE_CLIPBOARD:
      const { clipboardContent } = values;
      return writeClipboardData(clipboardContent);
  }
}

export default function Index() {
  const data = useLoaderData();
  const { clipboardContent } = data;

  const [content, setContent] = React.useState(clipboardContent);

  React.useEffect(() => {
    onValue(ref(database, DB_PATH), (snapshot: any) => {
      const data = snapshot.val();
      setContent(data);
    });
  }, []);

  return (
    <div>
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

              {/* <div className="py-4">
                <LinkCard />
              </div> */}

              {/* <Form method="post">
                <textarea
                  className="mt-4 w-full h-40 border-gray-500	rounded-lg border bg-gray-100 dark:bg-zinc-700 dark:text-white p-1"
                  id="clipboardContent"
                  name="clipboardContent"
                  defaultValue={content.data}
                >
                  {content.data}
                </textarea>
                <button
                  className="border-gray-500 font-bold	rounded-lg border bg-gray-100 px-2 py-1 dark:text-gray-50 dark:bg-zinc-700"
                  name="_action"
                  value={SAVE_CLIPBOARD}
                >
                  Save
                </button>
              </Form> */}
              <div className="mt-4">
                <h2 className="text-lg font-bold sm:text-xl dark:text-gray-50">
                  Get started today!
                </h2>
                <a
                  className="mt-4 inline-block rounded-full bg-gradient-to-r from-fuchsia-400 to-indigo-500 p-[2px] hover:text-white dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                  href={false ? "/download" : "/signup"}
                >
                  {false ? (
                    <span className="block rounded-full dark:bg-zinc-700 bg-white px-8 py-3 text-sm font-medium dark:hover:bg-transparent hover:bg-transparent dark:text-gray-100">
                      Add link
                    </span>
                  ) : (
                    <span className="block rounded-full dark:bg-zinc-700 bg-white px-8 py-3 text-sm font-medium dark:hover:bg-transparent hover:bg-transparent dark:text-gray-100">
                      Sign up
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
