import { useSearchParams } from "@remix-run/react";
import { getResources } from "~/data/resources";
import Button from "../shared/button";

export default function Hero({ title }: { title: string }) {
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "es";
  const resources = getResources(locale || "es");
  return (
    <div className="flex justify-center items-center h-[25rem] md:h-[35rem]  mx-auto bg-primary">
      <div className="p-10 max-w-screen-2xl">
        <h1 className="text-6xl md:text-8xl text-center text-white">{title}</h1>
        <div className="flex mt-10 space-x-2 justify-center">
          <Button
            text={resources.contactUs}
            color="bg-sauceRed"
            to="/contactUs"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
