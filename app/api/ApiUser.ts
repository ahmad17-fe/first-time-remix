import type { AxiosResponse } from "axios";
import service from "~/axios.server";

export const ApiLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<SuccessResponse<AR_Login>>> => {
  return service({
    url: "/login",
    method: "POST",
    data: {
      email,
      password,
    },
  });
};

export const ApiLogout = async (
  token: string
): Promise<AxiosResponse<AR_Logout>> => {
  return service({
    url: "/logout",
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const ApiGetUser = async (
  token: string
): Promise<AxiosResponse<SuccessResponse<AR_User>>> => {
  return service({
    url: "/user",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
