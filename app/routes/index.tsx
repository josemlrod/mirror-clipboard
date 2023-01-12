import { redirect } from "@remix-run/node";

import { getUserIdSession } from "~/utils";

export async function loader({ request }: { request: Request }) {
  const userId = await getUserIdSession({ request });

  if (userId) {
    return redirect("/links");
  }

  return {};
}

export default function Index() {
  return (
    <section className="h-full px-4 py-8 sm:px-6 lg:px-8 grid grid-cols-1 gap-y-8 lg:gap-x-16 justify-items-center content-start">
      <div className="mx-auto max-w-lg text-center lg:mx-0 lg:text-center">
        <h2 className="text-3xl font-bold sm:text-4xl dark:text-gray-50">
          Share your links
        </h2>
        <span className="text-m font-bold sm:text-l text-gray-500 dark:text-gray-200">
          (and files too, soon)
        </span>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Have you ever had two systems with different operating systems, and
          wanted to share links between them? (or even files?). This app is for
          you. Share links from your Mac to your PC, and from your iPhone, to
          your Android device or from your mobile device to your PC!
        </p>
      </div>
      <div className="mt-4 mx-auto max-w-lg text-center lg:mx-0 lg:text-center flex flex-col justify-center">
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
    </section>
  );
}
