import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function useProtectedView(location: string) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            void router.push(location);
        }
    }, [status, location, router]);
       
    return { status };
}