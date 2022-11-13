import { useEffect, useState } from "react";
import type { LoaderFunction } from "@remix-run/node";
import {
    Link,
    Outlet,
    useLoaderData,
} from "@remix-run/react";
import Logo from "~/images/logo.png";

import LeftArrow from "~/images/left-arrow.png";
import RightArrow from "~/images/right-arrow.png";
import { Flavor, getFlavors } from "~/data/contentful";

export const loader: LoaderFunction = async () => {

    const data: Flavor[] = await getFlavors();
    return { data };
};

export default function Flavors() {
    const { data }: { data: Flavor[] } = useLoaderData();
    const [currentFlaver, setCurrentFlavor] = useState<Flavor | null>();
    const [nextLink, setNextLink] = useState<string>("");
    const [prevLink, setPrevLink] = useState<string>("");

    const handleSetFlavorData = (flavor: Flavor, prev: string, next: string) => {
        setCurrentFlavor(flavor);
        setPrevLink(prev);
        setNextLink(next);
    };

    useEffect(() => {
        if (window?.location?.pathname == "/flavors") {
            setCurrentFlavor(null);
        }
    })

    return (

        <div
            className="main"
            style={{
                backgroundImage: `linear-gradient(${currentFlaver?.secondaryColor || "#d0e4cb"} 50%, ${currentFlaver?.primaryColor || "#5a82b3 "} 50%)`,
            }}
        >
            <div className="relative">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Yom Icecream logo"
                        style={{ margin: "auto" }}
                        className="absolute left-0 right-0 top-8 sm:top-2 z-30 w-40 sm:w-52"
                    />
                </Link>
                <div className="card max-w-screen-2xl p-4 sm:py-8 relative overflow-hidden my-20 mx-8 shadow-2xl">
                    {/* Header */}
                    <header className="hidden lg:flex justify-end mx-12">
                        <Link to="/wheretobuy">
                            <p className="ml-8 text-2xl Alatsi">Where to Buy</p>
                        </Link>
                        <a href="https://www.yomicecream.com/events">
                            <p className="ml-8 text-2xl Alatsi">Events</p>
                        </a>
                        <Link to="/flavors"><p className="ml-8 text-2xl Alatsi">Flavors</p></Link>
                    </header>
                    {/* Header End */}

                    <div className="flex main-content">
                        {/* Desktop nav */}
                        {currentFlaver &&
                            <div className="hidden md:flex items-center w-10 ml-2 mr-4 cursor-pointer">
                                <Link prefetch="render" to={`/flavors/${prevLink}`}>
                                    <img src={LeftArrow} alt="Navigate Left" />
                                </Link>
                            </div>
                        }
                        {/* end desktop nav */}

                        {/* Main Content */}
                        <Outlet context={{ data, handleSetFlavorData }} />
                        {/* Main Content End */}

                        {/* Desktop nav */}
                        {currentFlaver &&
                            <div className="hidden md:flex flex items-center w-10 ml-4 mr-2 cursor-pointer">
                                <Link prefetch="render" to={`/flavors/${nextLink}`}>
                                    <img src={RightArrow} alt="Navigate Right" />
                                </Link>
                            </div>
                        }
                        {/* end desktop nav */}
                    </div>

                    {/* Mobile Nav */}
                    {currentFlaver &&
                        <div className="md:hidden w-full flex justify-between items-center flex-row mt-8">
                            <Link prefetch="render" to={`/flavors/${prevLink}`}>
                                <div className="h-8 flex items-center">
                                    <img
                                        className="h-full inline-block"
                                        src={LeftArrow}
                                        alt="Navigate Left"
                                    />
                                    <p className="inline-block text-lg">Prev</p>
                                </div>
                            </Link>
                            <Link prefetch="render" to={`/flavors/${nextLink}`}>
                                <div className="h-8 flex items-center">
                                    <p className="inline-block text-lg">Next</p>
                                    <img
                                        className="h-full inline-block"
                                        src={RightArrow}
                                        alt="Navigate Right"
                                    />
                                </div>
                            </Link>
                        </div>
                    }
                    {/* End Mobile Nav */}
                </div>
            </div>
        </div>
    );
}