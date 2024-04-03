import Head from "next/head";
import ShortenerWithCard from "~/components/shortenerWithCard";
import Hero from "~/components/hero";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";


export default function Home() {
  return (
    <>
      <Head>
        <title>Short-Me</title>
        <meta name="description" content="Free Url Shortener" />
        <link rel="icon" href="/logoshortme.png" />
      </Head>
      <main>
      <Header />
      <Separator/>

        <div className="container flex flex-col items-center justify-center gap-4 px-4 lg:py-16 md:py-16 py-8">
        <Hero/>
        <ShortenerWithCard /> 
        </div>
      </main>
    </>
  );
}
