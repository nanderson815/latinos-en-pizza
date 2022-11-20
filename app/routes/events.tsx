import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import { ContenfulEvent, getEvents } from "~/data/contentful";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export const loader: LoaderFunction = async () => {
    const apiKey = process.env.GOOGLE_MAPS_SECRET
    const events: ContenfulEvent[] = await getEvents();
    return { events }
};


export default function Events() {
    const { events }: { events: ContenfulEvent[] } = useLoaderData();

    console.log(events[0].description);
    {/* {RichTextResponse(events[0].description)} */ }

    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <Header />
            <section className="bg-white h-full">
                <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-xl">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Upcoming Events</h2>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                    />
                </div>
            </section>
            <Footer />
        </div>
    )
}