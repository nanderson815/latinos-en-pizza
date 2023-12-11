import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import Card from "~/components/shared/card";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import type { Post } from "~/data/contentful";
import { getPosts } from "~/data/contentful";
import { getResources } from "~/data/resources";

export const meta: MetaFunction = () => {
  return {
    title: "Latinos en Pizza | Posts",
    description: "Stay up to date on everything related to Latinos en Pizza",
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "es";
  const data: Post[] = await getPosts(locale);
  return { data };
};

export default function Press() {
  const { data }: { data: Post[] } = useLoaderData();
  const [searchParams] = useSearchParams();
  const locale = searchParams.get("locale") || "es";
  const resources = getResources(locale || "es");

  return (
    <>
      <Header />
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center items-center h-[20rem] max-w-screen-2xl mx-auto bg-primary">
          <div className="p-10">
            <h1 className="uppercase text-4xl md:text-6xl text-center text-white  mt-6 md:mt-0">
              {resources.posts}
            </h1>
          </div>
        </div>
        <section className="bg-white h-full">
          <div className="flex flex-row flex-wrap justify-around mx-8 my-12">
            {data.map((post) => (
              <Card
                key={post.title}
                className="md:basis-1/3 basis-full bg-gray-100 mb-4"
              >
                <Link to={`${post.slug}`}>
                  <img
                    src={post.image.url}
                    alt={post.title}
                    className="w-full h-auto mb-4"
                  />
                  <div className=" p-2 ">
                    <h1 className="text-2xl md:text-3xl text-gray-800 text-center">
                      {post.title}
                    </h1>
                    <p className="text-xl text-gray-800 text-center pt-4"></p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
