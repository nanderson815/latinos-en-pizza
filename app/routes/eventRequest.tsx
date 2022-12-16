import { DataFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";
import Button from "~/components/shared/button";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import { formatDate } from "~/utilities/general";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Caterying",
        description: "Serve YOM Ice Cream at your next event with YOM catering!"
    }
}

export async function action({ request }: DataFunctionArgs) {
    const data: any = await request.formData();
    const resp = await fetch(`${request.url}/form`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
    })
    return resp.ok;
}

export default function EventRequest() {
    const actionData = useActionData();

    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-hero4 bg-cover bg-bottom">
                <div className="p-10">
                    <h1 className="uppercase text-4xl md:text-6xl text-center text-white">Private Event Request</h1>
                </div>
            </div>
            <section className="bg-white">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Want YOM Ice Cream catering at your next event? Let us know!</p>
                    <form id="eventRequest" name="eventRequest" method="POST" data-netlify="true" className="space-y-8">
                        <input type="hidden" name="form-name" value="eventRequest"></input>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name*</label>
                            <input type="text" id="name" name="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="First Last" required />
                        </div>
                        <div className="md:w-1/2 md:inline-block md:pr-2">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email*</label>
                            <input type="text" id="email" name="email" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="name@yomicecream.com" required />
                        </div>
                        <div className="md:w-1/2 md:inline-block">
                            <label htmlFor="tel" className="block mb-2 text-sm font-medium text-gray-900">Your phone #*</label>
                            <input type="tel" pattern="[0-9]{10}" id="tel" name="tel" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="7705555555" required />
                        </div>
                        <div className="md:w-1/2 md:inline-block md:pr-2">
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900">Your event date*</label>
                            <input type="date" id="date" name="date" min={formatDate(Date.now())} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" required />
                        </div>
                        <div className="md:w-1/2 md:inline-block">
                            <label htmlFor="attendees" className="block mb-2 text-sm font-medium text-gray-900">Number of attendees*</label>
                            <input type="number" id="attendees" name="attendees" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="150" required />
                        </div>
                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Event type*</label>
                            <input type="text" id="type" name="type" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="Private party" required />
                        </div>
                        <div className="md:w-3/4 md:inline-block md:pr-2">
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Event address*</label>
                            <input type="text" id="location" name="location" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="123 Main Street" required />
                        </div>
                        <div className="md:w-1/4 md:inline-block md:pr-2" > 
                            <label htmlFor="zip" className="block mb-2 text-sm font-medium text-gray-900">Location zip code*</label>
                            <input type="text" pattern="[0-9]{5}" id="zip" name="zip" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="30303" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your comments</label>
                            <textarea id="message" name="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                        </div>
                        {actionData && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            <span className="font-medium">Message Submitted!</span> Our team will reach out to you shortly.
                        </div>}
                        {actionData === false &&
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                <span className="font-medium">Something went wrong!</span> Please try again.
                            </div>}
                        <Button type="submit" text="Submit Request" />
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}