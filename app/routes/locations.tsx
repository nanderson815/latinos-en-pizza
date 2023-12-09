import { useLoadScript } from "@react-google-maps/api";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import GoogleMapComponent from "~/components/shared/googlemap";
import Header from "~/components/shared/header";
import LoadingOverlay from "~/components/shared/loadingOverlay";
import type { Location } from "~/data/contentful";
import { getLocations } from "~/data/contentful";

export interface UserLocation {
  lat: number;
  lng: number;
}

export const meta: MetaFunction = () => {
  return {
    title: "Latinos en Pizza | Locations",
  };
};

export const loader: LoaderFunction = async () => {
  const apiKey = process.env.GOOGLE_MAPS_SECRET;
  const locations: Location[] = await getLocations();
  return { key: apiKey, locations };
};

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

export default function Locations() {
  const { key, locations } = useLoaderData();
  const [userLocation, setUserLocation] = useState<UserLocation>();
  const [userLocationLoading, setUserLocationLoading] =
    useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(5);

  const { isLoaded } = useLoadScript({ googleMapsApiKey: key, libraries });

  useEffect(() => {
    if (window?.navigator?.geolocation) {
      setUserLocationLoading(true);
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setZoom(5);
          setUserLocationLoading(false);
        },
        () => {
          setUserLocationLoading(false);
          setZoom(5);
          setUserLocation({ lat: 33.74636858126393, lng: -84.37079962883581 });
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
      setZoom(5);
      setUserLocation({ lat: 33.74636858126393, lng: -84.37079962883581 });
    }
  }, []);

  return (
    <>
      <Header />
      <div
        className="flex space-x-2 justify-center mt-1 h-[calc(100vh_-_82px)] md:h-[calc(100vh_-_110px)]"
        style={{ overflow: "hidden" }}
      >
        <div className="w-screen h-full max-w-screen-2xl relative">
          {userLocationLoading && <LoadingOverlay message="Loading location" />}
          {isLoaded && (
            <GoogleMapComponent
              locations={locations}
              userLocation={userLocation}
              setUserLocation={setUserLocation}
              zoom={zoom}
              setZoom={setZoom}
            />
          )}
        </div>
      </div>
    </>
  );
}
