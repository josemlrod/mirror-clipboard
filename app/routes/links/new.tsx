import React from "react";
import { Dialog } from "@headlessui/react";
import { redirect } from "@remix-run/node";

import { SAVE_LINK } from "~/utils/constants";
import { getErrorMessage, getUserIdSession, writeClipboardData } from "~/utils";
import { Form } from "@remix-run/react";
import { uuidv4 } from "@firebase/util";

export async function loader({ request }: { request: Request }) {
  const userId = await getUserIdSession({ request });

  if (userId) {
    return {};
  }

  return redirect("/");
}

export async function action({ request }: { request: Request }) {
  const userId = await getUserIdSession({ request });

  if (userId) {
    const form = await request.formData();
    const formDataObject = Object.fromEntries(form);
    const { _action, linkAddress, linkName } = formDataObject;

    switch (_action) {
      case SAVE_LINK:
        try {
          await writeClipboardData(
            {
              id: uuidv4(),
              linkAddress,
              linkName,
            },
            userId
          );
          return redirect("/links");
        } catch (e) {
          throw new Error(getErrorMessage(e));
        }
      default:
        throw new Error("Unknown action");
    }
  }

  redirect("/");
}

export default function NewLink() {
  let [isOpen, setIsOpen] = React.useState(true);
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-12 dark:bg-zinc-900 border-gray-500">
          <Form method="post">
            <label
              htmlFor="LinkName"
              className="block text-xs font-medium text-gray-700 dark:text-gray-100"
            >
              Link name
            </label>

            <input
              type="text"
              id="LinkName"
              placeholder="Some link name"
              name="linkName"
              className="mt-1 w-full rounded-md border-gray-500 shadow-sm sm:text-sm dark:bg-zinc-700 dark:text-white"
            />

            <label
              htmlFor="LinkAddress"
              className="mt-4 block text-xs font-medium text-gray-700 dark:text-gray-100"
            >
              Link address
            </label>

            <textarea
              className="mt-4 w-full h-40 border-gray-500	rounded-lg border bg-gray-100 dark:bg-zinc-700 dark:text-white p-1"
              id="linkAddress"
              name="linkAddress"
              defaultValue=""
              placeholder="https://some_link.hey/"
            ></textarea>

            <button
              className="mt-4 rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              type="submit"
              name="_action"
              value={SAVE_LINK}
            >
              Save
            </button>
          </Form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
