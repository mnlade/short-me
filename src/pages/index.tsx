import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/ModeToggle";
import ShortenerWithCard from "~/components/shortenerWithCard";
import AuthShowcase from "~/components/authShowCase";

export default function Home() {
  return (
    <>
      <Head>
        <title>Short-Me</title>
        <meta name="description" content="Free Url Shortener" />
        <link rel="icon" href="/logoshortme.png" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center ">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Short <span className="text-[hsl(280,100%,70%)]">-</span> Me
          </h1>
          <p className="text-2xl text-[hsl(280,100%,70%)]">
            A simple but fast URL shortener
          </p>
          <ModeToggle />
        </div>
        <ShortenerWithCard />
      </main>
    </>
  );
}
