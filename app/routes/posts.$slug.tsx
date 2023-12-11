import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import RichTextResponse from "~/components/shared/richText";
import { getPost, type Post } from "~/data/contentful";

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = params;
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "es";
  const data = await getPost(slug as string, locale);
  return { data };
};

export default function PostPage() {
  const { data }: { data: Post } = useLoaderData();
  console.log(data.body);
  return (
    <>
      <Header />
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center items-center h-[20rem] max-w-screen-2xl mx-auto bg-primary">
          <div className="p-10">
            <h1 className="uppercase text-4xl md:text-6xl text-center text-white  mt-6 md:mt-0">
              {data.title}
            </h1>
          </div>
        </div>
        <section className="bg-white h-full">
          <div className="mt-4 px-8">
            <p className="text-lg text-gray-500">
              {RichTextResponse(data.body)}
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
