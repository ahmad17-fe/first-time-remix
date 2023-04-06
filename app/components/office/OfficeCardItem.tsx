import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import CurrencyDollarIcon from "@heroicons/react/24/outline/CurrencyDollarIcon";
import type { FC } from "react";
import { Link } from "@remix-run/react";

interface OfficeCardItemProps {
  images?: string;
  title?: string;
  description?: string;
  pricePerDay?: string;
  link?: string;
}

const OfficeCardItem: FC<OfficeCardItemProps> = ({
  images,
  description,
  title,
  pricePerDay,
  link,
}) => {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img src={images || "https://picsum.photos/720/480"} alt="product" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <h5 className="font-medium  text-xl">{title || "Lorem ipsum"}</h5>
          <p className="flex items-center gap-1.5 font-normal text-blue-gray-900">
            <CurrencyDollarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            {pricePerDay || 0}
            <span className="text-xs">/day</span>
          </p>
        </div>
        <p className="text-gray-600 eclipse line-clamp-3">
          {description ||
            `Here's a block of text from a blog post that isn't conveniently three lines long like you designed
  for originally. It's probably like 6 lines on mobile or even on desktop depending on how you have
  things laid out. `}
        </p>
      </CardBody>
      <CardFooter className="pt-3">
        <Link to={link || "#"}>
          <Button size="lg" fullWidth={true}>
            More details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OfficeCardItem;
