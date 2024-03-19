import { z } from "zod";
import { db } from "~/server/db";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import crypto from "crypto";

export const createLinkRouter = createTRPCRouter({
  createShortUrl: publicProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Function to generate a random short URL in base64
      const generateShortUrl = () => {
        return crypto.randomBytes(5).toString("base64").substring(0, 7);
      };

      // Recursive function to check if the short URL is unique
      const getUniqueShortUrl = async (): Promise<string> => {
        const shortUrl = generateShortUrl();
        const existingUrl = await db.link.findUnique({
          where: { short: shortUrl },
        });

        if (existingUrl) {
          return getUniqueShortUrl();
        } else {
          return shortUrl;
        }
      };

      const shortUrl = await getUniqueShortUrl();

      const createLinkData: {
        url: string;
        short: string;
        createdBy?: { connect: { id: string } };
      } = {
        url: input.url,
        short: shortUrl,
      };

      // Check if a user is logged in and if they have an ID
      if (ctx?.session?.user?.id) {
        // If a user is logged in, associate the created link with that user
        createLinkData.createdBy = { connect: { id: ctx.session.user.id } };
      } else {
        // If no user is logged in, associate the created link with the anonymous user
        createLinkData.createdBy = { connect: { id: "anonymous" } };
      }

      const createLink = await db.link.create({
        data: createLinkData,
      });

      return createLink;
    }
    ),
});

export const deleteAnonymousLinks = async () => {
  const links = await db.link.findMany({
    where: { createdBy: { id: "anonymous" } },
    });
    if (links) {
      await db.link.deleteMany({
        where: { createdBy: { id: "anonymous" } },
      });
    }   
}

