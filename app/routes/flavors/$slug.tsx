import { useLoaderData, useOutletContext } from "@remix-run/react";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useEffect } from 'react';
import { Flavor, getFlavor, Ingredient } from "~/data/contentful";

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {
      title: "YOM Ice Cream | Flavors",
      description: "YOM Ice Cream has lots of delicious flavors, made with fresh  in Atlanta, Georgia."
    }
  } else {
    // console.log(data);
    return {
      title: `YOM Ice Cream | ${data.data?.name}`,
      image: data.data?.primaryImage?.url,
      description: data?.data?.description,
    }
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const data: Flavor | undefined = await getFlavor(params.slug || "");
  return { data };
}

export default function PostSlug() {
  const { data }: { data: Flavor } = useLoaderData();
  const context: {
    data: Flavor[];
    handleSetFlavorData: (data: Flavor, prev: string, next: string) => null;
  } = useOutletContext();

  useEffect(() => {
    if (data && context.data) {

      const index = context.data.findIndex((val) => val.id === data.id);
      const length = context.data.length;

      const prevIndex = index - 1 < 0 ? length - 1 : index - 1;
      const nextIndex = index + 1 >= length ? 0 : index + 1;

      const prevLink = context.data[prevIndex].id;
      const nextLink = context.data[nextIndex].id;

      context.handleSetFlavorData(data, prevLink, nextLink);
    }
  }, [data]);

  if (!data) {
    return (
      <main>
        <h1>Flavor not found!</h1>
      </main>
    );
  }
  return (
    <div className="flex flex-row flex-wrap w-full">
      <div className="sm:basis-full mt-12 lg:mt-0 lg:basis-1/3 grow flex items-center">
        <div>
          <h1 className="text-4xl mb-2 sm:text-5xl font-bold Alatsi">
            {data.name}
          </h1>
          <p className="text-2xl md:text-3xl mb-2 Alatsi">{data.description}</p>
          <img
            className="w-full hidden lg:block"
            src={data.primaryImage.url}
            style={{ height: 500, objectFit: "cover", borderRadius: 10 }}
            alt={`A scoop of ${data.name}`}
          />
        </div>
      </div>

      <div className="sm:basis-full lg:basis-1/3 flex items-end -my-16">
        <img
          src={data.flavorImage.url}
          alt={`A scoop of ${data.name}`}
          className="rotate-90 scale-[1.17] lg:scale-[1.75] lg:w-full main-image lg:rotate-0 lg:h-5/6 lg:object-cover"
        />
      </div>

      <div className="sm:basis-full lg:basis-1/3 grow flex items-center lg:-ml-10">
        <div className="w-full">
          {data.ingredientsCollection.items.map((item: Ingredient) => (
            <div
              key={item.name}
              className="flex flex-nowrap justify-around lg:justify-between items-center py-2"
            >
              <div
                className="line hidden lg:block"
                style={{ border: `2px solid ${data.primaryColor}` }}
              ></div>
              <div
                style={{ backgroundColor: data.secondaryColor }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-black flex justify-center items-center md:mx-2"
              >
                <img
                  src={item.icon?.url}
                  style={{ height: "75%" }}
                  alt={`${item.icon.description}`}
                />
              </div>
              <p className="basis-2/3 lg:basis-7/12 text-2xl sm:text-3xl Alatsi">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
