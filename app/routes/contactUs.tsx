import Button from "~/components/shared/button";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { useActionData, useSearchParams } from "@remix-run/react";
import { getResources } from "~/data/resources";

export const meta: MetaFunction = () => {
  return {
    title: "Latinos en Pizza | Contact",
    description: "Contact us",
  };
};

export async function action({ request }: DataFunctionArgs) {
  const data: any = await request.formData();
  // trim off local search params
  const trimmed = request.url.split("?")[0];
  const resp = await fetch(`${trimmed}/form`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(data).toString(),
  });
  console.log(resp);
  return resp.ok;
}

export default function Contact() {
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale");
  const resources = getResources(locale || "es");
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-[15rem] max-w-screen-2xl mx-auto bg-primary">
        <div className="p-10">
          <h1 className="uppercase text-4xl md:text-6xl text-center text-white">
            {resources.contactUs}
          </h1>
        </div>
      </div>
      <section className="bg-white">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">
            {resources.contactUsCTA}
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="contact"></input>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {resources.yourEmail}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="name@website.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {resources.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                // placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                {resources.yourMessage}
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                // placeholder="Leave a comment..."
                required
              ></textarea>
            </div>
            {actionData && (
              <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                role="alert"
              >
                {resources.success}
              </div>
            )}
            {actionData === false && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                role="alert"
              >
                {resources.error}
              </div>
            )}
            <Button type="submit" text={resources.send} />
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}
