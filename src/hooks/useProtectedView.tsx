import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function useProtectedView() {
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            // When session is not available redirect to login page
            window.location.href = "/login";
        }
    }, [session]);

    return { props: {} };
}