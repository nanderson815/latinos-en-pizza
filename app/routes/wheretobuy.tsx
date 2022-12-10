import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import GoogleMapComponent from "~/components/shared/googlemap";
import Header from "~/components/shared/header";
import { getLocations, Location } from "~/data/contentful";

export interface UserLocation {
    lat: number;
    lng: number;
}

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Where to Buy",
        description: "Where to buy YOM Icea Cream in stores near you."
    }
}

export const loader: LoaderFunction = async () => {
    const apiKey = process.env.GOOGLE_MAPS_SECRET
    const locations: Location[] = await getLocations();
    return { key: apiKey, locations }
};

export default function WhereToBuy() {
    const { key, locations } = useLoaderData();
    const [userLocation, setUserLocation] = useState<UserLocation>();
    const [zoom, setZoom] = useState<number>(8);

    useEffect(() => {
        if (window?.navigator?.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position);
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
                setZoom(13);
            });
        } else {
            console.log('Geolocation is not supported by your browser');
        }
    }, [])

    return (
        <>
            <Header />
            <div className="flex space-x-2 justify-center mt-1" style={{ height: 'calc(100vh - 86px)', overflow: 'hidden' }}>
                <div className="w-screen h-full max-w-screen-2xl">

                    <GoogleMapComponent
                        locations={locations}
                        userLocation={userLocation}
                        zoom={zoom}
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