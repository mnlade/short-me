import React from "react";
import AuthShowcase from "./authShowCase";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";
import UserIcon from "./userIcon";

const UserHeader: React.FC = () => {
  return (
    <header>
      <div className="flex items-center justify-between py-3 px-4 lg:mx-80 md:mx-20 sm:mx-2">
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
          <ModeToggle />
          <AuthShowcase />
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
