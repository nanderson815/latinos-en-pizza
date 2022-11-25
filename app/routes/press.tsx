import { MetaFunction } from "@remix-run/node";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Press",
        description: "See what people are saying about YOM Ice Cream"
    }
}

export default function Press() {
    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <Header />
            <section className="bg-white h-full">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Press</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Check out what people are saying about YOM Ice Cream!</p>
                </div>
            </section>
            <Footer />
        </div>
    )
}