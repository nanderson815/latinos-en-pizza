import type { MetaFunction } from "@remix-run/node";
import styles from "./styles/global.css";
import calendar from "./styles/calendar.css";
import tailwind from "./styles/tailwind.css";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Yom Ice Cream",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: calendar },
  ];
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0 }}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};
