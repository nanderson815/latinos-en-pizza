import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Card from "~/components/shared/card";
import Footer from "~/components/shared/footer";
import Header from "~/components/shared/header";
import { getPress, Press } from "~/data/contentful";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | Press",
        description: "See what people are saying about YOM Ice Cream"
    }
}


export const loader: LoaderFunction = async () => {
    const data: Press[] = await getPress();
    return { data }
};

export default function Press() {
    const { data }: { data: Press[] } = useLoaderData();

    return (
        <>
            <Header />
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex justify-center md:items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-hero5 bg-cover bg-center">
                    <div className="p-10">
                        <h1 className="uppercase text-4xl md:text-6xl text-center text-white  mt-6 md:mt-0">Check out what people are saying about YOM Ice Cream!</h1>
                    </div>
                </div>
                <section className="bg-white h-full">
                    <div className="flex flex-row flex-wrap justify-around mx-8 my-12">
                        {data.map((article) => (
                            <Card key={article.title} className="md:basis-1/3 basis-full bg-gray-100 mb-4">
                                <a href={article.link} target="_blank">
                                    <img src={article.image.url} className="w-full h-auto mb-4" />
                                    <div className=" p-2 ">
                                        <h1 className="text-2xl md:text-3xl text-gray-800 text-center">{article.title}</h1>
                                        <p className="text-xl text-gray-800 text-center pt-4">{article.description}</p>
                                    </div>
                                </a>
                            </Card>
                        ))}
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}