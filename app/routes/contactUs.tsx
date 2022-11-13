import Button from "~/components/shared/button";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import type { DataFunctionArgs } from "@remix-run/node"

export async function action({ request }: DataFunctionArgs) {
    const data: any = await request.formData();
    console.log(new URLSearchParams(data).toString());
    console.log(request.url);
    const resp = await fetch(`${request.url}/form`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
    })
    console.log(resp.body);
    return null;
}

export default function Contact() {
    return (
        <div className="flex flex-col justify-between h-[100vh]">
            <Header />
            <section className="bg-white">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Have a question or feedback? Want YOM Ice Cream at your next event? We’d love to hear from you!</p>
                    <form name="contact" method="POST" data-netlify="true" className="space-y-8" action="/?index">
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
                        <Button type="submit" text="Send Message" />
                    </form>
                </div>
            </section>
            <Footer />
        </div>
    )
}