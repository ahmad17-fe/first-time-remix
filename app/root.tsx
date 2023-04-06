import type {
  LinksFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { ReactNode } from "react";
import GlobalStyles from "~/styles/global.css";
import { getEnv } from "./env.server";
import { getUser, logout } from "./models/user.server";

interface DocumentProps {
  children: ReactNode;
}

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: ENV.APP_TITLE,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: GlobalStyles,
    },
  ];
};

export interface LoaderParams {
  user?: AR_User | null;
  ENV: ReturnType<typeof getEnv>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json<LoaderParams>({
    user: user?.data.data,
    ENV: getEnv(),
  });
};

function Document({ children }: DocumentProps) {
  const { ENV } = useLoaderData<LoaderParams>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
