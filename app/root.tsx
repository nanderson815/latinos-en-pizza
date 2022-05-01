import { useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import styles from "./styles/global.css";
import tailwind from "./styles/tailwind.css";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { DocumentData } from "firebase/firestore";
import { getFlavors } from "./utilities";
import Logo from "./images/logo.png";

import LeftArrow from "./images/left-arrow.png";
import RightArrow from "./images/right-arrow.png";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Yom Ice Cream",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: tailwind },
  ];
}

interface Flavor {
  id: string;
  name: string;
  desc: string;
  image: string;
  image2: string;
  primaryColor: string;
  secondaryColor: string;
  ingredients: Ingredient[];
}

interface Ingredient {
  desc: string;
  icon: string;
}

export const loader: LoaderFunction = async ({ params }) => {
  const data: DocumentData | undefined = await getFlavors();
  // if on index, redirect to flavor page
  if (!params.slug) {
    return redirect(data[0].id);
  }
  return { data: data };
};

export default function App() {
  const { data }: { data: Flavor[] } = useLoaderData();
  const [currentFlaver, setCurrentFlavor] = useState<Flavor>();
  const [nextLink, setNextLink] = useState<string>("");
  const [prevLink, setPrevLink] = useState<string>("");

  const handleSetFlavorData = (flavor: Flavor, prev: string, next: string) => {
    setCurrentFlavor(flavor);
    setPrevLink(prev);
    setNextLink(next);
  };

  // console.log(currentFlaver);
  // console.log(nextLink);
  // console.log(prevLink);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>
        <main
          className="main"
          style={{
            backgroundImage: `linear-gradient(${currentFlaver?.secondaryColor} 50%, ${currentFlaver?.primaryColor} 50%)`,
          }}
        >
          <div className="relative">
            <a href="https://www.yomicecream.com/">
              <img
                src={Logo}
                alt="Yom Icecream logo"
                style={{ margin: "auto" }}
                className="absolute left-0 right-0 top-4 sm:-top-2 z-30 w-40 sm:w-52"
              />
            </a>
            <div className="card max-w-screen-2xl p-4 sm:py-8 sm:px-0 relative overflow-hidden my-14 mx-8 shadow-2xl">
              {/* Header */}
              <header className="hidden lg:flex justify-end mx-12">
                <a href="https://www.yomicecream.com/wheretobuy">
                  <p className="ml-8 text-2xl Alatsi">Where to Buy</p>
                </a>
                <a href="https://www.yomicecream.com/events">
                  <p className="ml-8 text-2xl Alatsi">Events</p>
                </a>
              </header>
              {/* Header End */}

              <div className="flex main-content">
                {/* Desktop nav */}
                <div className="hidden md:flex items-center w-10 ml-2 mr-4 cursor-pointer">
                  <Link to={`/${prevLink}`}>
                    <img src={LeftArrow} alt="Navigate Left" />
                  </Link>
                </div>
                {/* end desktop nav */}

                {/* Main Content */}
                <Outlet context={{ data, handleSetFlavorData }} />
                {/* Main Content End */}

                {/* Desktop nav */}
                <div className="hidden md:flex flex items-center w-10 ml-4 mr-2 cursor-pointer">
                  <Link to={`/${nextLink}`}>
                    <img src={RightArrow} alt="Navigate Right" />
                  </Link>
                </div>
                {/* end desktop nav */}
              </div>

              {/* Mobile Nav */}
              <div className="md:hidden w-full flex justify-between items-center flex-row mt-8">
                <div className="h-8 flex items-center">
                  <Link to={`/${prevLink}`}>
                    <img
                      className="h-full inline-block"
                      src={LeftArrow}
                      alt="Navigate Left"
                    />
                    <p className="inline-block text-lg">Prev</p>
                  </Link>
                </div>
                <div className="h-8 flex items-center">
                  <Link to={`/${nextLink}`}>
                    <p className="inline-block text-lg">Next</p>
                    <img
                      className="h-full inline-block"
                      src={RightArrow}
                      alt="Navigate Right"
                    />
                  </Link>
                </div>
              </div>
              {/* End Mobile Nav */}
            </div>
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
