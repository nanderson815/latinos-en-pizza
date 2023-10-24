import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import { ContenfulEvent, getEvents } from "~/data/contentful";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import listPlugin from '@fullcalendar/list';
import { useState } from "react";
import Modal from "~/components/shared/modal";
import { useIsMobile } from "~/utilities/utilities";

export const meta: MetaFunction = () => {
    return {
        title: "Latinos en Pizza | Events",
        description: "Check out upcoming events for Latinos en Pizza"
    }
}

export const loader: LoaderFunction = async () => {
    const apiKey = process.env.GOOGLE_MAPS_SECRET
    const events: ContenfulEvent[] = await getEvents();
    return { events }
};


export default function Events() {
    const { events }: { events: ContenfulEvent[] } = useLoaderData();
    const [open, setOpen] = useState(false)
    const [eventData, setEventData] = useState<ContenfulEvent>()

    const isMobile = useIsMobile();

    // console.log(events);
    // console.log(isMobile);

    const onEventClick = (info: any) => {
        info.jsEvent.preventDefault();
        setEventData(events.find(e => e.title === info.event.title));
        setOpen(true);
    }

    if (isMobile === undefined) {
        return null
    }


    return (
        <div className="">
            <Header />
            <div className="flex justify-center items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-hero3 bg-cover bg-bottom">
                <div className="p-10">
                    <h1 className="uppercase text-4xl md:text-6xl text-center text-white">Events</h1>
                </div>
            </div>
            <section className="bg-white h-full">
                <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-xl">
                    <Modal open={open} setOpen={setOpen} eventData={eventData} />
                    <FullCalendar
                        eventClick={onEventClick}
                        plugins={[listPlugin, dayGridPlugin]}
                        initialView={isMobile ? "listWeek" : "dayGridMonth"}
                        events={events.map((e: ContenfulEvent) => (
                            {
                                title: e.title,
                                start: e.startTime,
                                end: e.endTime,
                                interactive: true,
                                description: e.description,
                                image: e.image
                            }
                        ))}
                    />
                </div>
            </section>
            <Footer />
        </div>
    )
}