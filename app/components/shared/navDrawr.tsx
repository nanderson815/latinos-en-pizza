import { Link } from "@remix-run/react";
import { useState } from "react";
import MenuIcon from "~/icons/menu";

export default function navDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
            >
                <MenuIcon />
            </button>
            <div
                className={
                    " fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
                    (isOpen
                        ? " transition-opacity opacity-100 duration-500 translate-x-0 "
                        : " transition-all opacity-0 translate-x-full  ")
                }
            >
                <div
                    className={
                        " w-[65vw] max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                        (isOpen ? " translate-x-0 " : " translate-x-full ")
                    }
                >
                    <div className="relative max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                        <div className="p-4 font-bold text-lg text-gray-900">
                            <ul className="text-gray-600">
                                <li className="mb-2">
                                    <Link to="/flavors" className="hover:underline">Flavors</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/wheretobuy" className="hover:underline ">Where to Buy</Link>
                                </li>
                                <li className="mb-2">
                                    <Link to="/about" className="hover:underline">About</Link>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="hover:underline ">Book an Event</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="hover:underline ">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div
                    className=" w-screen h-full cursor-pointer "
                    onClick={() => {
                        setIsOpen(false);
                    }}
                ></div>
            </div>
        </>
    );
}