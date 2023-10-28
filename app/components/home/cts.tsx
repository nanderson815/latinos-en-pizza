import { useSearchParams } from "@remix-run/react";
import { getResources } from "~/data/resources";
import Button from "../shared/button";
import MapIcon from "public/images/map.png";

export default function CTA() {
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale");
  const resources = getResources(locale || "es");
  return (
    <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto p-5 md:p-8">
      <img src={MapIcon} alt="Map Icon" className="h-16 md:h-28" />
      <div className="p-5 md:p-8">
        <h1 className="text-2xl md:text-5xl text-center text-grey">
          {resources.locationCTA}
        </h1>
      </div>
      <div className="flex space-x-2 justify-center">
        <Button text={resources.findLocations} to="/locations" />
      </div>
    </div>
  );
}
