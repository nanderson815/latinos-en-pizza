import Button from "../shared/button";
import MapIcon from 'public/images/map.png'

export default function CTA() {
    return (

        <div className="flex flex-col justify-center items-center max-w-screen-2xl mx-auto p-5 md:p-8">
            <img src={MapIcon} className="h-16 md:h-28" />
            <div className="p-5 md:p-8">
                <h1 className="text-2xl md:text-5xl text-center text-grey">Find a retail location near you!</h1>
            </div>
            <div className="flex space-x-2 justify-center">
                <Button text="Find Locations" to="/wheretobuy" />
                {/* TODO: enable shop */}
                <Button text="Shop Online" disabled style={{ display: "none" }} />
            </div>
        </div>

    )
}