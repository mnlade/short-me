import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { MdContentCopy, MdVisibility } from "react-icons/md";
import { toast } from "./ui/use-toast";

interface DashCardProps {
  avatarSrc: string;
  username: string;
  shorturl: string;
  url: string;
  clickcounter: number;
}

const DashCard: React.FC<DashCardProps> = ({
  avatarSrc,
  username,
  shorturl,
  url,
  clickcounter
}) => {
  const copyToClipboard = () => {
    void navigator.clipboard.writeText(
      `https://short-me-omega.vercel.app/l/${shorturl}`,
    );
  };

  return (
    <div className="m-2 grid h-[71px] w-[370px] grid-cols-5 gap-4 rounded-lg border bg-card text-card-foreground shadow-md">
      <div className="col-span-1 row-span-2 m-auto flex items-center justify-center">
        <Avatar>
          <AvatarImage alt="Icono" src={avatarSrc} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="col-span-4 row-span-2 flex flex-col p-3 pl-0">
      <div className="flex items-center">
            <a
              href={`https://short-me-omega.vercel.app/l/${shorturl}`}
              className="text-m overflow-hidden overflow-ellipsis whitespace-nowrap font-semibold"
            >
              {shorturl}
            </a>
            <MdContentCopy
              onClick={() => {
                copyToClipboard();
                toast({
                  description: "Your link has been copied to the clipboard!",
                });
              }}
              className="ml-2 mr-2 cursor-pointer hover:scale-125"
            />{" "}
            <div className="flex flex-row items-center">
              <MdVisibility className="mr-[2px]"/>
              <p className="text-sm text-muted-foreground" >{clickcounter}</p>
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
