import { useLoadScript } from "@react-google-maps/api";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import GoogleMapComponent from "~/components/shared/googlemap";
import Header from "~/components/shared/header";
import LoadingOverlay from "~/components/shared/loadingOverlay";
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
    const [userLocationLoading, setUserLocationLoading] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(8);

    const { isLoaded } = useLoadScript({ googleMapsApiKey: key, libraries: ['places'], });


    useEffect(() => {
        if (window?.navigator?.geolocation) {
            setUserLocationLoading(true);
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
                    setZoom(13);
                    setUserLocationLoading(false);
                },
                () => setUserLocationLoading(false));
        } else {
            console.log('Geolocation is not supported by your browser');
        }
    }, [])

    return (
        <>
            <Header />
            <div className="flex space-x-2 justify-center mt-1 h-[calc(100vh_-_82px)] md:h-[calc(100vh_-_110px)]" style={{ overflow: 'hidden' }}>
                <div className="w-screen h-full max-w-screen-2xl relative">
                    {userLocationLoading && <LoadingOverlay message="Loading location" />}
                    {isLoaded &&
                        <GoogleMapComponent
                            locations={locations}
                            userLocation={userLocation}
                            setUserLocation={setUserLocation}
                            zoom={zoom}
                            setZoom={setZoom}
                        />
                    }
                </div>
            </div>
        </>

    )
}