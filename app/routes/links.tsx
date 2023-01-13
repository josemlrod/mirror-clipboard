import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import React from "react";

import LinkCard from "~/components/LinkCard";
import UserBanner from "~/components/UserBanner";
import {
  deleteLink,
  getErrorMessage,
  getUserIdSession,
  readClipboardData,
  readUserData,
  type LinkData,
} from "~/utils";
import { DELETE_LINK, LOG_OUT } from "~/utils/constants";
import { destroySession, getSession } from "~/sessions";

export async function loader({ request }: { request: Request }) {
  const userId = await getUserIdSession({ request });

  if (userId) {
    const [user] = await readUserData(userId);
    const data = await readClipboardData(user.id);
    return json({ user, data });
  }

  return redirect("/");
}

export async function action({ request }: { request: Request }) {
  const userId = await getUserIdSession({ request });

  if (userId) {
    const form = await request.formData();
    const { _action, ...values } = Object.fromEntries(form);

    switch (_action) {
      case DELETE_LINK:
        try {
          const { id } = values;
          await deleteLink((typeof id === "string" && id) || "", userId);
          return json({ success: true });
        } catch (e) {
          throw new Error(getErrorMessage(e));
        }

      case LOG_OUT:
        const session = await getSession(request.headers.get("Cookie"));
        return redirect("/", {
          headers: {
            "Set-Cookie": await destroySession(session),
          },
        });

      default:
        throw new Error("Unknown action");
    }
  }

  return redirect("/");
}

export default function Links() {
  const { user, data } = useLoaderData();
  return (
    <section
      style={{ height: "inherit" }}
      className="flex-col items-center dark:bg-zinc-900 w-screen mx-auto flex max-w-3xl p-4"
    >
      <UserBanner {...user} />
      {data.length ? (
        <React.Fragment>
          <h2 className="my-4 text-3xl font-bold sm:text-4xl dark:text-gray-50">
            Saved links
          </h2>

          <article className="w-full">
            <ul className="space-y-2">
              {data.map(({ id, linkAddress, linkName }: LinkData) => (
                <LinkCard
                  key={id}
                  id={id}
                  linkAddress={
                    typeof linkAddress === "string" ? linkAddress : ""
                  }
                  linkName={typeof linkName === "string" ? linkName : ""}
                />
              ))}
            </ul>
          </article>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-center">
            <h2 className="text-3xl font-bold sm:text-4xl dark:text-gray-50">
              No links found
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Add some links so that you can access them from all of your
              devices!
            </p>
          </div>
        </React.Fragment>
      )}
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
