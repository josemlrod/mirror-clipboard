import React from "react";
import { Form } from "@remix-run/react";

import { LOG_OUT } from "~/utils/constants";
import { addDropdownWindowClickListener } from "~/utils";

export default function UserBanner({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  React.useEffect(() => {
    addDropdownWindowClickListener(setShowDropdown);
  }, []);

  return (
    <header
      aria-label="Page Header"
      className="w-full dark:bg-zinc-900 flex flex-row mb-4"
    >
      <div className="grow flex items-center">
        <h1 className="text-2xl font-bold dark:text-gray-100 sm:text-3xl">
          Welcome Back, {name}!
        </h1>
      </div>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex items-center sm:justify-between sm:gap-4 flex-col relative">
        <button
          type="button"
          className="dropbtn group flex shrink-0 items-center rounded-lg transition"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img
            alt="Man"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="h-10 w-10 rounded-full object-cover pointer-events-none"
          />

          <p className="ml-2 hidden text-left text-xs sm:block pointer-events-none">
            <strong className="block font-medium dark:text-gray-100">
              {name}
            </strong>

            <span className="dark:text-gray-300">{email}</span>
          </p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" pointer-events-none ml-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <Form method="post">
          <button
            id="dropdown_content"
            type="submit"
            className={`absolute z-10 w-22 sm:w-56 rounded-md border dark:border-gray-500 border-gray-100 bg-white shadow-lg p-4 dark:bg-zinc-700 dark:text-gray-50 left-3 top-20 ${
              (showDropdown && "block") || "hidden"
            } `}
            name="_action"
            value={LOG_OUT}
          >
            Log out
          </button>
        </Form>
      </div>
    </header>
  );
}
