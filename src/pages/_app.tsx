import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { api } from "~/utils/api";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const slugFromPath = router.asPath.split("/l/")[1];
    if (slugFromPath) {
      setSlug(slugFromPath);
    }
  }, [router.asPath]);


 const {data} = api.createLinkRouter.getLongUrl.useQuery({ url: slug });


  if (data) {
    void router.push(data);
  }

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
