import Head from "next/head";
import ShortenerWithCard from "~/components/shortenerWithCard";
import Hero from "~/components/hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Short-Me</title>
        <meta name="description" content="Free Url Shortener" />
        <link rel="icon" href="/logoshortme.png" />
      </Head>
      <main className=" flex flex-col items-center justify-center ">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <Hero/>
        <ShortenerWithCard /> 
        </div>
      </main>
    </>
  );
}
