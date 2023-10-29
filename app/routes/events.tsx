import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import type { ContenfulEvent } from "~/data/contentful";
import { getEvents } from "~/data/contentful";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import listPlugin from "@fullcalendar/list";
import { useState } from "react";
import Modal from "~/components/shared/modal";
import { useIsMobile } from "~/utilities/utilities";
import { getResources } from "~/data/resources";

export const meta: MetaFunction = () => {
  return {
    title: "Latinos en Pizza | Events",
    description: "Check out upcoming events for Latinos en Pizza",
  };
};

export const loader: LoaderFunction = async () => {
  const events: ContenfulEvent[] = await getEvents();
  return { events };
};

export default function Events() {
  const { events }: { events: ContenfulEvent[] } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState<ContenfulEvent>();

  const isMobile = useIsMobile();

  const onEventClick = (info: any) => {
    info.jsEvent.preventDefault();
    setEventData(events.find((e) => e.title === info.event.title));
    setOpen(true);
  };

  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "es";
  const resources = getResources(locale || "es");

  if (isMobile === undefined) {
    return null;
  }

  return (
    <div className="">
      <Header />
      <div className="flex justify-center items-center h-[15rem] md:h-[15rem] max-w-screen-2xl mx-auto bg-primary">
        <div className="p-10">
          <h1 className="uppercase text-4xl md:text-6xl text-center text-white">
            {resources.events}
          </h1>
        </div>
      </div>
      <section className="bg-white h-full">
        <div className="py-8 lg:py-8 px-4 mx-auto max-w-screen-xl">
          <Modal open={open} setOpen={setOpen} eventData={eventData} />
          <FullCalendar
            eventClick={onEventClick}
            plugins={[listPlugin, dayGridPlugin]}
            initialView={isMobile ? "listWeek" : "dayGridMonth"}
            events={events.map((e: ContenfulEvent) => ({
              title: e.title,
              start: e.startTime,
              end: e.endTime,
              interactive: true,
              description: e.description,
              image: e.image,
            }))}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
