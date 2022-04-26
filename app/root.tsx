import { useState } from "react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import styles from "./styles/global.css";
import tailwind from "./styles/tailwind.css";
import {
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
  return { data };
};

export default function App() {
  const { data }: { data: Flavor[] } = useLoaderData();
  const [flavorIndex, setFlavorIndex] = useState(0);

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
            backgroundImage: `linear-gradient(${data[flavorIndex].secondaryColor} 50%, ${data[flavorIndex].primaryColor} 50%)`,
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
            <div className="card max-w-screen-2xl p-8 relative overflow-hidden my-14 mx-8 shadow-2xl">
              <Outlet context={data[flavorIndex]} />
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
