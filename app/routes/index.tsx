import { Link } from "@remix-run/react";
import Header from "~/components/header";

export default function Home() {
    return (
        <>
            <Header />
            <div>
                <div className="flex space-x-2 justify-center">
                    <div>Home page under construction. In the meantime,</div>
                    <br />
                </div>
                <div className="flex space-x-2 justify-center">
                    <Link to="flavors">
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Checkout Flavors</button>
                    </Link>
                    <Link to="wheretobuy">
                        <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Checkout Where to Buy</button>
                    </Link>
                </div>
            </div>
        </>
    )
}