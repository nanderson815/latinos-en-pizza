import type { LoaderFunction } from "@remix-run/node";
import type { Testimonial } from "~/data/contentful";
import { getTestimonials } from "~/data/contentful";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/shared/header";
import Hero from "~/components/home/hero";
import CTA from "~/components/home/cts";
import Section from "~/components/home/section";
import Button from "~/components/shared/button";
import Reviews from "~/components/home/reviews";
import Footer from "~/components/shared/footer";

export const loader: LoaderFunction = async () => {
    const data: Testimonial[] = await getTestimonials();
    return { data }
};

export default function Home() {
    const { data }: { data: Testimonial[] } = useLoaderData();
    return (
        <>
            <Header />
            <Hero />
            <CTA />
            <Section>
                <div className="flex items-center max-w-screen-2xl p-5 md:p-8">
                    <div className="flex items-center flex-col">
                        <div className="p-5 md:p-8 flex-initial w-64 md:w-96">
                            <h1 className="text-2xl md:text-5xl text-center text-grey">We believe that the greatest pleasures in life are also the simplest.</h1>
                        </div>
                    </div>
                </div>
            </Section>
            <Section background="bg-pints" alignLeft>
                <div className="flex items-center max-w-screen-2xl p-5 md:p-8">
                    <div className="flex items-center flex-col">
                        <div className="p-5 md:p-8 flex-initial w-64 md:w-96">
                            <h1 className="text-2xl md:text-5xl text-center text-grey">Hosting an event? We’ll help you make it a party to remember!</h1>
                        </div>
                        <Button text="Submit Request" color="bg-lemon" to="/eventRequest" />
                    </div>
                </div>
            </Section>
            <Reviews reviews={data} />
            <Footer />
        </>
    )
}