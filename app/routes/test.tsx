import { useLoaderData } from "@remix-run/react";
import { getFlavors } from "~/utilities";

export const loader = async () => {
  const flavors = await getFlavors();
  return { data: flavors };
};

export default function Index() {
  const { data } = useLoaderData();
  console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>This is a test!</h1>
    </div>
  );
}
