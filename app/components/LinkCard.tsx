export function LinkCard() {
  return (
    <article>
      <ul className="space-y-2">
        <li>
          <span className="block h-full rounded-lg border border-gray-500 p-4">
            <strong className="font-medium dark:text-gray-50">Link A</strong>

            <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              consequuntur deleniti, unde ab ut in!
            </p>
          </span>
        </li>

        <li>
          <span className="block h-full rounded-lg border border-gray-500 p-4">
            <strong className="font-medium dark:text-gray-50">Link B</strong>

            <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              consequuntur deleniti, unde ab ut in!
            </p>
          </span>
        </li>
      </ul>
    </article>
  );
}
