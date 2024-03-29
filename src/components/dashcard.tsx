import React from "react";
import { Button } from "~/components/ui/button";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface DashCardProps {
  avatarSrc: string;
  username: string;
  shorturl: string;
  url: string;
}

const DashCard: React.FC<DashCardProps> = ({
  avatarSrc,
  username,
  shorturl,
  url,
}) => {
  return (
    <div className="m-2 grid h-[71px] w-[370px] grid-cols-5 gap-4 rounded-lg border bg-card text-card-foreground shadow-md">
      <div className="col-span-1 row-span-2 m-auto flex items-center justify-center">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-4 row-span-2 flex flex-col p-3 pl-0">
        <div className="flex items-center justify-between">
          <a
            href={`https://short-me-omega.vercel.app/l/${shorturl}`}
            className="text-m overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold"
          >
            {shorturl}
          </a>
          <div className="flex items-start space-x-1">
            <div>
              <MdModeEdit className="-mt-2 h-4 w-4 hover:scale-125 " />
            </div>
            <div>
              <MdDelete className="-mt-2 h-4 w-4 hover:scale-125 " />
            </div>
          </div>
        </div>
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-muted-foreground">
          {url}
        </p>
      </div>
    </div>
  );
};

export default DashCard;
