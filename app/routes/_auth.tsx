import { Alert } from "@material-tailwind/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { requireGuest } from "~/models/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireGuest(request);
  return json({});
};

const AuthPage = () => {
  return (
    <div>
      <Alert>
        Hey 👋 this is my first time trying Remix JS, back to{" "}
        <Link to="/" className="underline">
          home
        </Link>
        .
      </Alert>
      <Outlet />
    </div>
  );
};

export default AuthPage;
