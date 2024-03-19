import React from "react";
import { api } from "~/utils/api";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

interface DashCardProps {
  avatarSrc: string;
  username: string;
  shorturl: string;
  url: string;
}

const DashCard: React.FC<DashCardProps> = ({ avatarSrc, username, shorturl, url }) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-96 m4">
      <div className="flex m-4">
        <Avatar>
          <AvatarImage src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="pl-4 mr-3 flex flex-col max-w-80">
          <h3 className="text-m font-semibold">{shorturl}</h3>
          <p className="text-sm text-muted-foreground truncate">{url}</p>
        </div>
      </div>
    </div>
  );
}

export default DashCard;
