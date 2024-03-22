import React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface DashCardProps {
  avatarSrc: string;
  username: string;
  shorturl: string;
  url: string;
}

const DashCard: React.FC<DashCardProps> = ({ avatarSrc, username, shorturl, url }) => {
  return (
    <div className="flex w-full max-w-sm rounded-lg border bg-card text-card-foreground shadow-md m4 truncate">
      <div className="flex m-4">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="pl-4 flex flex-col max-w-72">
          <h3 className="text-m font-semibold">{shorturl}</h3>
          <p className="text-sm text-muted-foreground truncate">{url}</p>
        </div>
      </div>
    </div>
  );
}

export default DashCard;
