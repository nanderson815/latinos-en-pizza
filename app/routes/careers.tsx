import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";



export default function Careers() {
    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <Header />
            <section className="bg-white h-full">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Careers</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">We'd love to work with you! Check here for job postings.</p>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500">No jobs available right now. Please check again soon.</p>
                </div>
            </section>
            <Footer />
        </div>
    )
}