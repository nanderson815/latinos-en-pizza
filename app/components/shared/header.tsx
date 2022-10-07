import { Link } from "@remix-run/react";
import MenuIcon from "~/icons/menu";
import ShopIcon from "~/icons/shop";
import Logo from "~/images/logo.png";

export default function Header() {
    return (
        <div className="relative bg-white">
            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6">
                <div className="flex items-center justify-between border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
                    <div className="hidden flex justify-start md:w-0 md:flex-1 space-x-10 md:flex">
                        <Link to="/flavors" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Flavors
                        </Link>
                        <Link to="/wheretobuy" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Where to Buy
                        </Link>
                    </div>
                    <div className="md:hidden flex justify-start md:w-0 md:flex-1 space-x-10 md:flex">
                        <a
                            href="#"
                            className="rounded-full inline-flex items-center justify-center whitespace-nowrap border border-transparent px-3 py-3 text-base font-medium hover:text-white shadow-sm hover:bg-indigo-700"
                        >
                            <ShopIcon />
                        </a>
                    </div>
                    <div className="space-x-10 md:flex">
                        <a href="/">
                            <span className="sr-only">YOM Ice Cream</span>
                            <img
                                className="md:h-20 h-14 w-auto"
                                src={Logo}
                                alt="YOM ice cream logo"
                            />
                        </a>
                    </div>
                    <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <a href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                            Sign in
                        </a>
                        <a
                            href="#"
                            className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Sign up
                        </a>
                    </div>
                    <div className="md:hidden items-center justify-end md:flex md:flex-1 lg:w-0">
                        <a
                            href="#"
                            className="rounded-full inline-flex items-center justify-center whitespace-nowrap border border-transparent bg-indigo-600 px-3 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            <MenuIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}