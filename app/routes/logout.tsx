import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { logout } from "~/models/user.server";
import { destroyUserSession } from "~/session.server";

export const loader: LoaderFunction = () => {
  return redirect("/");
};
export const action: ActionFunction = async ({ request }) => {
  try {
    await logout(request);
    return destroyUserSession({
      redirectTo: "/login",
      request,
    });
  } catch (error) {
    return redirect("/");
  }
};
