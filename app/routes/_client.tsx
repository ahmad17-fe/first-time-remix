import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useRouteLoaderData } from "@remix-run/react";
import Layout from "~/components/Layout";
import { requireAuth } from "~/models/user.server";
import type { LoaderParams as LoaderRootParams } from "~/root";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuth(request);
  return json({});
};

const ClientPage = () => {
  const data = useRouteLoaderData("root") as LoaderRootParams;
  return (
    <Layout user={data?.user}>
      <Outlet />
    </Layout>
  );
};

export default ClientPage;
