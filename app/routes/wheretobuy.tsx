import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import GoogleMapComponent from "~/components/googlemap";



export const loader: LoaderFunction = async () => {
    const apiKey = process.env.GOOGLE_MAPS_SECRET
    console.log(apiKey);
    return { key: apiKey }
};

export default function WhereToBuy() {
    const { key } = useLoaderData();
    console.log(key);
    return (
        <div className="flex space-x-2 justify-center">
            <GoogleMapComponent
                isMarkerShown
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px`, width: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
            />
        </div>

    )
}