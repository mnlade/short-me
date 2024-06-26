import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function AuthShowcase() {
  const { data: sessionData } = useSession();
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {/* <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p> */}
      <Button className="w-[86px]"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </Button>
    </div>
  );
}
