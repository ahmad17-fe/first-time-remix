import { redirect } from "@remix-run/node";
import { ApiGetUser, ApiLogin, ApiLogout } from "~/api/ApiUser";
import { currentToken } from "~/session.server";

export const _USER_TKN = "USR_TKN";

export const login = async ({
  request,
  email,
  password,
}: {
  request: Request;
  email: string;
  password: string;
}) => {
  try {
    const res = await ApiLogin({ email, password });
    return Promise.resolve(res);
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

export const logout = async (request: Request) => {
  try {
    const token = await currentToken(request);
    const res = await ApiLogout(token);
    return Promise.resolve(res);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (request: Request) => {
  try {
    const token = await currentToken(request);
    console.log(token);
    const res = await ApiGetUser(token);
    return Promise.resolve(res);
  } catch (error) {
    return null;
  }
};

export const requireGuest = async (request: Request) => {
  const user = await getUser(request);
  if (user) throw redirect("/");
};

export const requireAuth = async (request: Request) => {
  const token = await currentToken(request);
  if (!token) throw redirect("/login");
};
