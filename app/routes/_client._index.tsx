import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ApiGetOffices } from "~/api/ApiOffices";
import OfficeCardItem from "~/components/office/OfficeCardItem";
import AppTitle from "~/utils/AppTitle";

const _TITLE = AppTitle({ subtitle: "Home" });

export const meta: V2_MetaFunction = () => {
  return [{ title: _TITLE }];
};

interface Loader {
  offices: AR_Office[];
}

export const loader: LoaderFunction = async () => {
  const res = await ApiGetOffices();
  return json<Loader>({
    offices: res.data.data,
  });
};

export default function Index() {
  const { offices } = useLoaderData<Loader>();
  return (
    <div className="flex gap-4 flex-wrap">
      {offices.map((office) => (
        <OfficeCardItem
          key={office.id}
          images={office.images[0].path}
          title={office.title}
          description={office.description}
          pricePerDay={office.price_per_day.toString()}
          link={`/offices/${office.id}`}
        />
      ))}
    </div>
  );
}
