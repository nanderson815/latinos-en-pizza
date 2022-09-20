import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { mapStyles } from "~/utilities/mapSettings"

interface MapProps {
    children?: any
    isMarkerShown?: boolean
}

const defaultMapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    styles: mapStyles
}

const GoogleMapComponent = withScriptjs(withGoogleMap(({ isMarkerShown }: MapProps) =>
    <GoogleMap
        options={defaultMapOptions}
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        {isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
))

export default GoogleMapComponent;

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map