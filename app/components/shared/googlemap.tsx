import { useState } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { Location } from "~/data/contentful"
import { mapStyles } from "~/utilities/mapSettings"
import Logo from "~/images/yomConeSmall.png";
import Card from "./card"

interface MapProps {
    children?: any
    locations?: Location[]
}

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles
}

const GoogleMapComponent = withScriptjs(withGoogleMap(({ locations }: MapProps) => {
    const [visible, setVisible] = useState('')

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
            position={{ lat: location.lat, lng: location.long }}
            onClick={() => onClickHandler(location.name)}
            icon={Logo}
        >
            {visible === location.name && (
                <InfoWindow onCloseClick={clearVisible}>
                    <Card title={location.name} tags={location.tags}>
                        <a href={`https://www.google.com/maps/search/?api=1&query=${location.address}`} className="text-blue text-base" target="blank">
                            {location.address}
                        </a>
                    </Card>
                </InfoWindow>
            )}
        </Marker>

    ))
    return (
        <GoogleMap
            options={defaultMapOptions}
            onClick={clearVisible}
            defaultZoom={8}
            defaultCenter={{ lat: 33.74636858126393, lng: -84.37079962883581 }}
            zoom={7}
        >
            {locations && markers}
        </GoogleMap>
    )
}
))

export default GoogleMapComponent;