import Head from "next/head";
import ShortenerWithCard from "~/components/shortenerWithCard";
import Hero from "~/components/hero";
import Header from "~/components/header";
import { Separator } from "~/components/ui/separator";
import Footer from "~/components/footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Short-Me</title>
        <meta name="description" content="Free Url Shortener" />
        <meta
          name="google-site-verification"
          content="ydpLuARVLQCzlLmRXPwIsmggWWzVAd-GzNJWD6tLm6Q"
        />
        <link rel="icon" href="/logoshortme.png" />
      </Head>
      <main>
        <Header />
        <Separator />

        <div className="container flex flex-col items-center justify-center gap-4 px-4 py-8 pb-20 md:py-16 lg:py-16 ">
          <Hero />
          <ShortenerWithCard />
        </div>
        <div className=" fixed bottom-0 w-full text-sm text-muted-foreground backdrop-blur-sm animate-in fade-in-25">
          <Separator />
          <Footer />
        </div>
      </main>
    </>
  );
}
