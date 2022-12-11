import { useState } from "react"
import { GoogleMap, Marker, InfoWindow, } from "@react-google-maps/api"
import { Location } from "~/data/contentful"
import Logo from "~/images/yomConeSmall.png";
import Card from "./card"
import { UserLocation } from "~/routes/wheretobuy";
import { usePlacesWidget } from "react-google-autocomplete";
import { mapStyles } from "~/utilities/mapSettings"

interface MapProps {
    children?: any
    locations?: Location[]
    userLocation?: UserLocation
    setUserLocation: any
    zoom: number
    setZoom: any
}

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles
}

const GoogleMapComponent = ({ locations, userLocation, setUserLocation, zoom, setZoom }: MapProps) => {
    const [visible, setVisible] = useState('')
    const defaultCenter = { lat: 33.74636858126393, lng: -84.37079962883581 };

    const clearVisible = () => {
        setVisible('')
    }

    const { ref } = usePlacesWidget({
        onPlaceSelected: (place) => {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();
            if (!!lat && !!lng) {
                setUserLocation({ lat, lng });
                setZoom(13);
            }
        }
    })


    const onClickHandler = (name: string) => {
        // const element = document.getElementById(id)
        // element.scrollIntoView({ block: 'center' })
        setVisible(name)
    }

    const markers = locations?.map((location) => (
        <Marker
            key={location.name}
            position={{ lat: location.location.lat, lng: location.location.lon }}
            onClick={() => onClickHandler(location.name)}
            icon={Logo}
        >
            {visible === location.name && (
                <InfoWindow onCloseClick={clearVisible}>
                    <Card title={location.name} tags={location.tags}>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${location.address}`} className="text-blue-400 text-base" target="blank">
                            {location.address}
                        </a>
                        <p className="text-base">{location.phone}</p>
                    </Card>
                </InfoWindow>
            )}
        </Marker>
    ));

    if (userLocation) {
        const userLocationMarker = (<Marker key="userLocation" position={userLocation} />);
        markers?.push(userLocationMarker);
    }

    return (
        <>
            <div className="absolute w-full md:w-1/2 mx-auto mt-2 z-20 inset-x-0 px-1">
                {/* @ts-ignore */}
                <input ref={ref} type="text" id="locationSearch" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Search location..." />
            </div>
            <GoogleMap
                onClick={clearVisible}
                mapContainerClassName="h-full w-full"
                // @ts-ignore 
                options={defaultMapOptions}
                center={userLocation || defaultCenter}
                zoom={zoom}
            >
                {locations && markers}
            </GoogleMap>
        </>
    )
}

export default GoogleMapComponent;