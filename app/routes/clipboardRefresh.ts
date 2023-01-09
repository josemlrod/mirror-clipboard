import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
  console.log("request: ", request);
  return json(
    {
      success: true,
    },
    200
  );
}
