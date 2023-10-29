import type { LoaderFunction } from "@remix-run/node";
import type { HomePage } from "~/data/contentful";
import { getHomePage } from "~/data/contentful";
import { useLoaderData } from "@remix-run/react";
import Header from "~/components/shared/header";
import Hero from "~/components/home/hero";
import CTA from "~/components/home/cts";
import Section from "~/components/home/section";
import Footer from "~/components/shared/footer";
import HomeSection from "~/components/home/homeSection";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") || "es";
  const data: HomePage = await getHomePage(locale || "es");
  return { data };
};

export default function Home() {
  const { data }: { data: HomePage } = useLoaderData();
  const { heroText, sectionsCollection } = data;
  return (
    <>
      <Header />
      <Hero title={heroText} />
      {sectionsCollection?.items?.map((section) => (
        <Section key={section.title} background={section.backgroundColor}>
          <HomeSection {...section} />
        </Section>
      ))}
      <CTA />
      <Footer />
    </>
  );
}
