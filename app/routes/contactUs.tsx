import Button from "~/components/shared/button";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node"
import { useActionData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Contact",
        description: "Contact us"
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

export default function Contact() {
    const actionData = useActionData();
    return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-hero4 bg-cover bg-bottom">
                <div className="p-10">
                    <h1 className="uppercase text-4xl md:text-6xl text-center text-white">Contact Us</h1>
                </div>
            </div>
            <section className="bg-white">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Have a question or feedback? Want YOM Ice Cream at your next event? We’d love to hear from you!</p>
                    <form name="contact" method="POST" data-netlify="true" className="space-y-8">
                        <input type="hidden" name="form-name" value="contact"></input>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input type="email" id="email" name="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="name@yomicecream.com" required />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900">Subject</label>
                            <input type="text" id="subject" name="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500" placeholder="Let us know how we can help you" required />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">Your message</label>
                            <textarea id="message" name="message" rows={6} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..." required></textarea>
                        </div>
                        {actionData && <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                            <span className="font-medium">Success!</span> Thanks for contacting YOM Ice Cream.
                        </div>}
                        {actionData === false &&
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                                <span className="font-medium">Something went wrong!</span> Please try again.
                            </div>}
                        <Button type="submit" text="Send Message" />
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}