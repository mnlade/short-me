import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserIcon() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {sessionData && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-10 w-10">
              <AvatarFallback>A</AvatarFallback>
              <AvatarImage src={sessionData?.user?.image ?? ""} />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {sessionData?.user?.name ?? ""}
            </DropdownMenuLabel>
            <DropdownMenuLabel className="text-sm text-muted-foreground">
              {sessionData?.user?.email ?? ""}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />{" "}
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
