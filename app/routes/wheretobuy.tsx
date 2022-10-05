import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { locations } from "~/data/locations";
import GoogleMapComponent from "~/components/googlemap";
import Header from "~/components/header";



export const loader: LoaderFunction = async () => {
    const apiKey = process.env.GOOGLE_MAPS_SECRET
    console.log(apiKey);
    return { key: apiKey }
};

export default function WhereToBuy() {
    const { key } = useLoaderData();
    return (
        <>
            <Header />
            <div className="flex space-x-2 justify-center mt-1" style={{ height: 'calc(100vh - 86px)', overflow: 'hidden' }}>
                <div className="w-screen h-full max-w-screen-2xl">

                    <GoogleMapComponent
                        locations={locations}
                        loadingElement={<div className="h-full" />}
                        containerElement={<div className="h-full w-full" />}
                        mapElement={<div className="h-full" />}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
                    />
                </div>
            </div>
        </>

    )
}