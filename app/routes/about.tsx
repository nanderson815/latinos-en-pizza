import Header from "~/components/shared/header";
import Footer from "~/components/shared/footer";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { AboutPage} from "~/data/contentful";
import { getAboutPage } from "~/data/contentful";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return {
        title: "Latinos en Pizza | About",
    }
}

export const loader: LoaderFunction = async () => {
    const data: AboutPage = await getAboutPage();
    return { data }
};

export default function About() {
    const { data }: { data: AboutPage } = useLoaderData();

    return (
        <>
            <Header />
            <main className="max-w-screen-2xl mx-auto pb-8">
                <div className="flex justify-center md:items-center h-[25rem] md:h-[35rem] max-w-screen-2xl mx-auto bg-hero2 bg-cover bg-bottom">
                    <div className="p-10">
                        <h1 className="uppercase text-4xl md:text-6xl text-center text-white  mt-6 md:mt-0">Meet Your (Ice Cream) Makers</h1>
                    </div>
                </div>
                <div>
                    <p className="text-xl text-center pt-4">{data.aboutUs}</p>
                </div>
                <div>
                    <div className="flex flex-row flex-wrap my-8">
                        {data.foundersCollection.items.map((founder) => (
                            <div key={founder.name} className="md:basis-1/2 basis-full p-4">
                                <img src={founder.headshot.url} className="w-full h-auto mb-4" />
                                <h1 className="text-3xl md:text-5xl text-gray-800 text-center">{founder.name}</h1>
                                <p className="text-xl text-center pt-4">{founder.about}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}