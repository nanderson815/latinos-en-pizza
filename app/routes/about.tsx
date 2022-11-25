import Header from "~/components/shared/header";
import Footer from "~/components/shared/footer";
import Simon from 'public/images/simon.jpg'
import William from 'public/images/william.jpg'
import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return {
        title: "YOM Ice Cream | About",
    }
}

export default function About() {
    return (
        <>
            <Header />
            <main className="max-w-screen-2xl mx-auto py-8">
                <div>
                    <h1 className="text-3xl md:text-5xl text-gray-800 text-center">Meet Your (Ice Cream) Makers</h1>
                    <p className="text-xl text-center pt-4">Founded by brothers William & Simon, Yōm is a premium custard ice cream company in the heart of Atlanta with recipes perfected over 17 years. We believe in treating your taste buds like they’re your buds. Because life’s better making memories together, one scoop at a time.</p>
                </div>
                <div>
                    <div className="flex flex-row flex-wrap my-8">
                        <div className="md:basis-1/2 basis-full p-4">
                            <img src={Simon} className="w-full h-auto mb-4" />
                            <h1 className="text-3xl md:text-5xl text-gray-800 text-center">Simon McLane</h1>
                            <p className="text-xl text-center pt-4">Simon McLane is a creative, perfectionist, foodie, and a bigger nerd than his brother William (no matter what he says.) He is the co-founder, COO, and R&D lead of Yōm Ice Cream. His passion for food, particularly his sweet tooth, led him to make his first batch of ice cream at age 9. His perfectionist nature insisted he continue to hone his skills, which inevitably led to Yōm 18 years later. Because Simon gets to show his creativity and share the joy he has through making it, Yōm is a dream come true. Outside of ice cream, Simon is a practitioner and instructor of Cuong Nhu martial arts, is an avid hockey fan (Go Jets Go!), loves to read, pretends to be a writer, and in general enjoys the nerdy things in life.</p>
                        </div>
                        <div className="md:basis-1/2 basis-full p-4">
                            <img src={William} className="w-full h-auto mb-4" />
                            <h1 className="text-3xl md:text-5xl text-gray-800 text-center">William McLane</h1>
                            <p className="text-xl text-center pt-4">William McLane is an entrepreneur, academic, and all around nerd. He is the co-founder and CEO of Yom, an artisanal ice cream company in the heart of Atlanta. Being passionate about people and food his whole life, William was inspired to share his brother’s ice cream (seeing how much people enjoy it). When he is not immersed in running Yōm, William can be found playing strategy board games, hiking, playing video games, traveling, and grooving on his drums.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}