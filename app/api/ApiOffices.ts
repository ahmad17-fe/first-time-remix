import type { AxiosResponse } from "axios";
import service from "~/axios.server";

export const ApiGetOffices = async (): Promise<
  AxiosResponse<SuccessResponseWithMeta<AR_Office[]>>
> => {
  return service({
    url: "/offices",
  });
};

export const ApiGetOffice = async ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse<SuccessResponse<AR_Office>>> => {
  return service({
    url: `/offices/${id}`,
  });
};
