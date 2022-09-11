import { Link, useOutletContext } from "@remix-run/react";
import { Flavor } from "../flavors";

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
                                    src={flavor.image2}
                                    style={{ height: 300, objectFit: "cover", borderRadius: 10 }}
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