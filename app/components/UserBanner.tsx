import { Menu } from "@headlessui/react";

export default function UserBanner() {
  return (
    <header
      aria-label="Page Header"
      className="w-full dark:bg-zinc-900 flex flex-row mb-4"
    >
      <div className="grow flex items-center">
        <h1 className="text-2xl font-bold dark:text-gray-100 sm:text-3xl">
          Welcome Back, Barry!
        </h1>
      </div>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 flex items-center sm:justify-between sm:gap-4 flex-col">
        {/* <div className="flex items-center sm:justify-between sm:gap-4"> */}
        {/* <button
            type="button"
            className="group flex shrink-0 items-center rounded-lg transition"
          >
            <img
              alt="Man"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="h-10 w-10 rounded-full object-cover"
            />

            <p className="ml-2 hidden text-left text-xs sm:block">
              <strong className="block font-medium dark:text-gray-100">
                Eric Frusciante
              </strong>

              <span className="dark:text-gray-300"> eric@frusciante.com </span>
            </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button> */}
        <Menu>
          <Menu.Button>
            <button
              type="button"
              className="group flex shrink-0 items-center rounded-lg transition"
            >
              <img
                alt="Man"
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                className="h-10 w-10 rounded-full object-cover"
              />

              <p className="ml-2 hidden text-left text-xs sm:block">
                <strong className="block font-medium dark:text-gray-100">
                  Eric Frusciante
                </strong>

                <span className="dark:text-gray-300">
                  {" "}
                  eric@frusciante.com{" "}
                </span>
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-4 hidden h-5 w-5 text-gray-500 transition group-hover:text-gray-700 sm:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </Menu.Button>
          <Menu.Items as="section" className="fixed mt-12">
            <Menu.Item>
              <button className="w-22 rounded-md border border-gray-100 bg-white shadow-lg p-4">
                Log out
              </button>
            </Menu.Item>
            {/* <button className="w-56 rounded-md border border-gray-100 bg-white shadow-lg p-4">
              Log out
            </button> */}
          </Menu.Items>
        </Menu>
        {/* </div> */}
      </div>
    </header>
  );
}
