/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useSearchParams } from "@remix-run/react";
import Logo from "~/images/logo.svg";
import NavDrawr from "./navDrawr";
import { LocaleToggle } from "./localeToggles";
import { getResources } from "~/data/resources";

export default function Header() {
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale");
  const resources = getResources(locale || "es");
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
          <div className="hidden flex justify-start md:w-0 md:flex-1 space-x-10 md:flex items-center">
            <Link
              to="/locations"
              className="text-xl my-4 font-medium text-gray-500 hover:text-gray-900"
            >
              {resources.locations}
            </Link>
            <LocaleToggle />
          </div>
          <div className="space-x-10 md:flex">
            <Link to="/">
              <span className="sr-only">Latinos en Pizza</span>
              <img
                src={Logo}
                alt="Latinos en pizza logo"
                style={{ margin: "auto" }}
                className="absolute left-0 right-0 top-8 sm:top-6 z-30 w-24 sm:w-24"
              />
            </Link>
          </div>
          <div className="hidden items-center justify-end space-x-10 md:flex md:flex-1 lg:w-0">
            {/* <Link
              to="/about"
              className="text-xl font-medium text-gray-500 hover:text-gray-900"
            >
              {resources.about}
            </Link> */}
            <Link
              to="/events"
              className="text-xl font-medium text-gray-500 hover:text-gray-900"
            >
              {resources.events}
            </Link>
          </div>
          <div className="md:hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <a
              href="#"
              className="rounded-full inline-flex items-center justify-center whitespace-nowrap border border-transparent bg-sauceRed  px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
            >
              <NavDrawr />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
