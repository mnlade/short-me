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
    }),
    getLinkByUrl: publicProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const data = await db.link.findFirst({
        where: {
          url: {
            equals: input.url,
          },
        },
        orderBy: {       
          createdAt: 'desc',
        },
      });
  
      return data;
    }),
    
});


// Function to delete anonymous links
const deleteAnonymousLinks = async () => {
    const fiveMinutesAgo = new Date(Date.now() - 1 * 10 * 1000); // Calculating the time 30 minutes ago
    const links = await db.link.findMany({
      where: { 
        createdBy: { id: "anonymous" },
        createdAt: { lte: fiveMinutesAgo } // Check if createdAt is less than or equal to fiveMinutesAgo
      },
    });
    if (links.length > 0) {
      await db.link.deleteMany({
        where: { 
          createdBy: { id: "anonymous" },
          createdAt: { lte: fiveMinutesAgo } // Again, ensuring we're deleting only the links created at least 5 minutes ago
        },
      });
      console.log('Anonymous links deleted successfully.');
    }
  }
  
  // Run deleteAnonymousLinks every 5 minutes
  // setInterval(deleteAnonymousLinks, 1 * 10 * 1000);
  // issue:check function its not working when deployed to vercel but works locally
  
  