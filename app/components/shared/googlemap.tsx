import { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { Location } from "~/data/contentful"
import { mapStyles } from "~/utilities/mapSettings"
import Logo from "~/images/yomConeSmall.png";
import Card from "./card"
import { UserLocation } from "~/routes/wheretobuy";

interface MapProps {
    children?: any
    locations?: Location[]
    userLocation?: UserLocation
    zoom: number
}

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles
}

const GoogleMapComponent = withScriptjs(withGoogleMap(({ locations, userLocation, zoom }: MapProps) => {
    const [visible, setVisible] = useState('')
    const defaultCenter = { lat: 33.74636858126393, lng: -84.37079962883581 };

    const clearVisible = () => {
        setVisible('')
    }

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
        <GoogleMap
            options={defaultMapOptions}
            onClick={clearVisible}
            defaultZoom={8}
            defaultCenter={defaultCenter}
            center={userLocation || defaultCenter}
            zoom={zoom}
        >
            {locations && markers}
        </GoogleMap>
    )
}
))

export default GoogleMapComponent;