import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Head from "next/head";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Sign in</title>
        <link rel="icon" href="/logoshortme.png" />
      </Head>
      <div className="flex min-h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign in to Short-Me</CardTitle>
            <CardDescription>Start making short links</CardDescription>
          </CardHeader>
          <CardContent //All with google dont works with auth pendant to check just redirect to the login page deactivated in envs and authOptions
          >
            <div className="grid w-full items-center gap-4">
              {Object.values(providers).map((provider) => (
                <div key={provider.id}>
                  <div className="flex flex-col space-y-1.5">
                    <Button onClick={() => signIn(provider.id)}>
                      <span>Sign in with {provider.name}</span>
                      {provider.id === "discord" && (
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 24 24"
                          data-name="Flat Color"
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon flat-color ml-2 h-6 w-6"
                        >
                          <path
                            d="M20.11 6.25a2 2 0 0 0-1.21-1.19A24.45 24.45 0 0 0 12 4a24.45 24.45 0 0 0-6.9 1.06 2 2 0 0 0-1.21 1.19A30.79 30.79 0 0 0 2 16.67a1.08 1.08 0 0 0 .21.62A8.31 8.31 0 0 0 7.93 20a1 1 0 0 0 1-.7l.76-2.49A17.94 17.94 0 0 0 12 17a17.94 17.94 0 0 0 2.28-.19L15 19.3a1 1 0 0 0 1 .7h.07a8.31 8.31 0 0 0 5.72-2.71 1.08 1.08 0 0 0 .21-.62 30.79 30.79 0 0 0-1.89-10.42Z"
                            fill="#000"
                          />
                          <path
                            d="M10.5 10A1.5 1.5 0 1 1 9 8.5a1.5 1.5 0 0 1 1.5 1.5ZM15 8.5a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 15 8.5Z"
                            fill="#2ca9bc"
                          />
                        </svg>
                      )}
                      {provider.id === "github" && (
                        <GitHubLogoIcon className="ml-2 h-6 w-6" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.

  if (session) {
    return { redirect: { destination: "/dash" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
