import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import { LinkCard } from "~/components/LinkCard";
import {
  deleteLink,
  getErrorMessage,
  readClipboardData,
  type LinkData,
} from "~/utils";
import { DELETE_LINK } from "~/utils/constants";

export async function loader() {
  const data = await readClipboardData();
  return true ? json(data) : redirect("/signup");
}

export async function action({ request }: { request: Request }) {
  const form = await request.formData();
  const formDataObject = Object.fromEntries(form);
  const { _action, ...values } = formDataObject;

  switch (_action) {
    case DELETE_LINK:
      try {
        const { id } = values;
        await deleteLink((typeof id === "string" && id) || "");
        return json({ success: true });
      } catch (e) {
        throw new Error(getErrorMessage(e));
      }

    default:
      throw new Error("Unknown action");
  }
}

export default function Links() {
  const data = useLoaderData();
  return (
    <section
      style={{ height: "inherit" }}
      className="flex-col items-center dark:bg-zinc-900 w-screen mx-auto flex max-w-3xl p-4"
    >
      <h2 className="my-4 text-3xl font-bold sm:text-4xl dark:text-gray-50">
        Saved links
      </h2>

      <article className="w-full">
        <ul className="space-y-2">
          {data.map(({ id, linkAddress, linkName }: LinkData) => (
            <LinkCard
              key={id}
              id={id}
              linkAddress={typeof linkAddress === "string" ? linkAddress : ""}
              linkName={typeof linkName === "string" ? linkName : ""}
            />
          ))}
        </ul>
      </article>

      <a
        className="mt-4 inline-block rounded-full bg-gradient-to-r from-fuchsia-400 to-indigo-500 p-[2px] hover:text-white dark:hover:text-white focus:outline-none focus:ring active:text-opacity-75"
        href="/links/new"
      >
        <span className="block rounded-full dark:bg-zinc-700 bg-white px-8 py-3 text-sm font-medium dark:hover:bg-transparent hover:bg-transparent dark:text-gray-100">
          Add link
        </span>
      </a>
      <Outlet />
    </section>
  );
}
