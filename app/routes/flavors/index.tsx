import { MetaFunction } from "@remix-run/node";
import { Link, useOutletContext } from "@remix-run/react";
import { Flavor } from "~/data/contentful";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Flavors",
        description: "YOM Ice Cream has lots of delicious flavors, made with fresh  in Atlanta, Georgia."
    }
}

export default function Flavors() {
    const context: {
        data: Flavor[];
        handleSetFlavorData: (data: null, prev: null, next: null) => null;
    } = useOutletContext();

    return (
        <div>
            <div className="flex flex-row flex-wrap w-full">
                {context.data.map((flavor) => {
                    return (
                        <div key={flavor.id} className="basis-full lg:basis-1/3 flex items-center py-2 md:px-4 mb-4">
                            <Link className="w-full" to={`/flavors/${flavor.id}`}>
                                <img
                                    className="w-full lg:block"
                                    src={flavor.primaryImage.url}
                                    style={{ width: 600, height: 400, objectFit: "cover", borderRadius: 10, margin: "auto" }}
                                    alt={`A scoop of ${flavor.name}`}
                                />
                                <h2 className="text-2xl text-center font-semibold" >{flavor.name}</h2>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}