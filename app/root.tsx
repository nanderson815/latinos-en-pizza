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
  url: "https://www.yomicecream.com",
  description: "YOM is premium custard ice cream perfected over 15 years in the heart of Atlanta. We believe in treating your taste buds like they’re your buds. Because life’s better making memories together, one scoop at a time.",
  image: "http://static1.squarespace.com/static/5dd3f3cdeeffcb7babf1c291/t/5df9020b4b25696a015252f3/1576600078052/yo%CC%84m_thumbnail-18.png?format=1500w",
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
