
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/components/ui/theme-provider";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster"
import Header from "~/components/header";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <main className={`font-sans ${inter.variable}`}>
        <Header />
          <Component {...pageProps} />
        </main>
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
