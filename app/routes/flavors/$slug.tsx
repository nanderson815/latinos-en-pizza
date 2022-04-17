import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { getFlavor, getImageUrl } from "~/utilities";
import type { DocumentData } from "firebase/firestore";

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
  const data: DocumentData | undefined = await getFlavor(params.slug);
  if (data) {
    const scoopUrl = await getImageUrl(data?.image);
    const secondaryImgUrl = await getImageUrl(data?.image2);
    data.ingredients = await Promise.all(
      data.ingredients.map(async (ingredient: Ingredient) => {
        const url = await getImageUrl(ingredient.icon);
        return { ...ingredient, icon: url };
      })
    );
    return json({
      data: {
        ...data,
        image: scoopUrl,
        image2: secondaryImgUrl,
      },
    });
  } else {
    return { data };
  }
};

export default function PostSlug() {
  const { data }: { data: Flavor } = useLoaderData();

  console.log(data);

  if (!data) {
    return (
      <main>
        <h1>Flavor not found!</h1>
      </main>
    );
  }
  return (
    <main
      className="main"
      style={{
        backgroundImage: `linear-gradient(${data.secondaryColor} 50%, ${data.primaryColor} 50%)`,
      }}
    >
      <div className="card">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold underline">{data.name}</h1>
          <p>{data.desc}</p>

          <img
            src={data.image2}
            style={{ height: 300 }}
            alt={`A scoop of ${data.name}`}
          />
        </div>

        <div>
          <img
            src={data.image}
            style={{ height: "100%" }}
            alt={`A scoop of ${data.name}`}
          />
        </div>

        <div className="flex-grow">
          {data.ingredients.map((item: Ingredient) => (
            <div key={item.desc}>
              <p>{item.desc}</p>
              <img
                src={item.icon}
                style={{ height: 75 }}
                alt={`${item.desc}`}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
