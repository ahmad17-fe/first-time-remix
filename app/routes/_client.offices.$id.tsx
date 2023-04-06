import { Avatar, Button, Typography } from "@material-tailwind/react";
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ApiGetOffice } from "~/api/ApiOffices";
import BuildingOfficeIcon from "@heroicons/react/24/outline/BuildingOfficeIcon";
import AppTitle from "~/utils/AppTitle";

export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: AppTitle({ subtitle: data.office.title }) }];
};

interface Loader {
  office: AR_Office;
  primaryImage: AR_OfficeImage;
  images: AR_OfficeImage[] | [];
}

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.id, "Id is required");
  const res = await ApiGetOffice({ id: params.id });
  const office = Object.freeze(res.data.data);
  const primaryImage = office.images.filter((img) => {
    return img.id === office.featured_image_id;
  })[0];
  const images =
    office.images.length > 0
      ? office.images.filter((img) => img.id !== office.featured_image_id)
      : [];
  return json<Loader>({
    office,
    primaryImage,
    images,
  });
};

const OfficePage = () => {
  const { office, images, primaryImage } = useLoaderData<Loader>();

  return (
    <>
      <div
        className={`md:grid ${
          images.length > 0 ? "md:grid-cols-2" : "md:grid-cols-1"
        } md:gap-4 border-b pt-2 pb-4`}
      >
        {images.length > 0 ? (
          <div className="hidden md:grid md:gap-4">
            {images.map((img) => {
              return (
                <div key={img.id}>
                  <img
                    src={img.path}
                    alt={`#${office.id}`}
                    className="w-full object-cover lg:h-[360px] md:h-[240px]"
                  />
                </div>
              );
            })}
          </div>
        ) : null}

        <div className="w-auto h-auto">
          <img
            src={primaryImage.path}
            alt={`#${primaryImage.id}`}
            className={`w-full object-cover h-[360px] ${
              images.length > 0 ? "lg:h-full" : "lg:h-[716px]"
            } ${images.length > 0 ? "md:h-full" : "md:h-[496px]"}`}
          />
        </div>
      </div>
      <div className="py-4 grid gap-4 grid-flow-row md:grid md:grid-cols-2 md:gap-2">
        <div className="md:border-r px-4">
          <Typography variant="h2">{office.title}</Typography>
          <div className="mt-4">
            <Typography variant="small" className="mb-2" color="gray">
              Upload By:
            </Typography>
            <div className="flex gap-1">
              <Avatar
                size="xs"
                variant="circular"
                className="border"
                src="https://i.pravatar.cc/300"
              />
              <Typography variant="small">{office.user.name}</Typography>
            </div>
          </div>
          <Typography className="mt-4">{office.description}</Typography>
        </div>
        <div className="px-4">
          <Typography variant="h4">
            ${office.price_per_day}{" "}
            <small className="text-gray-600 font-normal">/day</small>
          </Typography>
          <div className="mt-6">
            <div className="flex gap-2">
              <BuildingOfficeIcon className="h-5 w-5" />
              <Typography>{office.address_line1}</Typography>
            </div>
            <div className="flex gap-2 mt-4">
              <BuildingOfficeIcon className="h-5 w-5" />
              <Typography>{office.address_line2 || "..."}</Typography>
            </div>
          </div>
          <div className="mt-4">
            <iframe
              title="map"
              className="w-full max-w-full h-[250px]"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?center=${office.lat},${office.lng}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-4">
            <Button fullWidth size="lg">
              Reservation
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficePage;
