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
import { useRouter } from 'next/router';

export default function UserIcon() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const handleDashboardRedirect = () => {
    void router.push('/dash');
  };
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {sessionData ? (
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
            <DropdownMenuLabel className="text-sm text-muted-foreground -mt-[10px]">
              {sessionData?.user?.email ?? ""}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />{" "}
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDashboardRedirect} >Dashboard</DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>  */}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
     
        <Avatar className="h-10 w-10">
              <AvatarFallback></AvatarFallback>
            </Avatar>
      )}
    </div>
  );
}