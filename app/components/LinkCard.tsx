type Props = {
  linkAddress: FormDataEntryValue;
  linkName: FormDataEntryValue;
};

export function LinkCard({ linkAddress, linkName }: Props) {
  return (
    <li>
      <span className="block h-full rounded-lg border border-gray-500 p-4">
        <strong className="font-medium dark:text-gray-50">
          {typeof linkName === "string" && linkName}
        </strong>
        <p className="mt-1 text-xs font-medium text-gray-600 dark:text-gray-300">
          {typeof linkAddress === "string" && linkAddress}
        </p>
      </span>
    </li>
  );
}
