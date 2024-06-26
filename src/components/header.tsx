import React from "react";
import AuthShowcase from "./authShowCase";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

const Header: React.FC = () => {
  const router = useRouter();

  const handleDashboardRedirect = () => {
    void router.push("/dash");
  };
  return (
    <header>
      <div className="mx-2 flex items-center justify-between px-4 py-3 sm:mx-2 md:mx-2 2xl:mx-80">
        <Link href="/">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Short<span className="text-sky-500">Me</span>
            </h1>
            <Image
              className="mx-2 mb-1"
              src="/logoshortme.png"
              width={32}
              height={32}
              alt="Logo"
            />
          </div>
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant={"outline"} onClick={handleDashboardRedirect}>
            Dash
          </Button>
          <ModeToggle />
          <AuthShowcase />
        </div>
      </div>
    </header>
  );
};

export default Header;
