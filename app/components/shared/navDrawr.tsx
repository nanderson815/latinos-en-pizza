import { Link, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { getResources } from "~/data/resources";
import MenuIcon from "~/icons/menu";

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "es";
  const resources = getResources(locale || "es");
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </button>
      <div
        className={
          " fixed overflow-hidden z-30 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
          (isOpen
            ? " transition-opacity opacity-100 duration-500 translate-x-0 "
            : " transition-all opacity-0 translate-x-full  ")
        }
      >
        <div
          className={
            " w-[65vw] max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
            (isOpen ? " translate-x-0 " : " translate-x-full ")
          }
        >
          <div className="relative max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
            <div className="p-4 font-bold text-2xl text-gray-900">
              <ul
                className="text-gray-600"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <li className="mb-4">
                  <Link
                    to={`/locations?locale=${locale}`}
                    className="hover:underline "
                  >
                    {resources.locations}
                  </Link>
                </li>
                {/* <li className="mb-4">
                                    <Link to="/about" className="hover:underline">About</Link>
                                </li> */}
                <li className="mb-4">
                  <Link
                    to={`/press?locale=${locale}`}
                    className="hover:underline"
                  >
                    {resources.press}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to={`/posts?locale=${locale}`}
                    className="hover:underline"
                  >
                    {resources.posts}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    to={`/events?locale=${locale}`}
                    className="hover:underline"
                  >
                    {resources.events}
                  </Link>
                </li>
                {/* <li className="mb-4">
                                    <Link to="/eventRequest" className="hover:underline">Book an Event</Link>
                                </li> */}
                <li className="mb-4">
                  <Link
                    to={`/contactUs?locale=${locale}`}
                    className="hover:underline "
                  >
                    {resources.contactUs}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className=" w-screen h-full cursor-pointer "
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      </div>
    </>
  );
}
