import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { _USER_TKN } from "./models/user.server";

invariant(process.env.SESSION_KEY, "SESSION_KEY must be set");

export const _SESSION_KEY = process.env.SESSION_KEY;

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__GRA",
    secure: process.env.NODE_ENV === "production",
    secrets: [_SESSION_KEY],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 1,
    httpOnly: true,
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export const createUserSession = async ({
  request,
  accessToken,
  redirectTo,
}: {
  request: Request;
  accessToken: string;
  redirectTo: string;
}) => {
  const session = await getSession(request);
  session.set(_USER_TKN, accessToken);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
};

export const destroyUserSession = async ({
  request,
  redirectTo,
}: {
  request: Request;
  redirectTo: string;
}) => {
  const session = await getSession(request);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
};

export const currentToken = async (request: Request) => {
  const session = await getSession(request);
  return session.get(_USER_TKN);
};
