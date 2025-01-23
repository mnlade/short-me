import { createTRPCRouter } from "~/server/api/trpc";
import { createLinkRouter} from "~/server/api/routers/shortener";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  createLinkRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
