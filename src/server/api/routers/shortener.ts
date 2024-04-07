import { customAlphabet } from 'nanoid';
import { z } from 'zod';
import { db } from '~/server/db';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

export const createLinkRouter = createTRPCRouter({
  createShortUrl: publicProcedure
    .input(
      z.object({
        url: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Function to generate a random short URL in base62
      const generateShortUrl = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

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

    createShortUrlWithDescription: protectedProcedure
    .input(
      z.object({
        url: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Function to generate a random short URL in base62
      const generateShortUrl = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 7);

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
        description?: string;
        createdBy?: { connect: { id: string } };
      } = {
        description: input.description,
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

    getLinksByUser: protectedProcedure
    .query(async ({ ctx }) => {
      const links = await db.link.findMany({
        where: {
          createdBy: { id: ctx.session.user.id },
        },
        orderBy: { createdAt: 'desc' },
      });

      return links;
    }), 

    updateLinkDescription: protectedProcedure
    .input(
      z.object({
        short: z.string(),
        newDescription: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Check if a user is logged in and if they have an ID
      if (ctx?.session?.user?.id) {
        // If a user is logged in, update the link description
        const updatedLink = await db.link.update({
          where: { short: input.short },
          data: { description: input.newDescription },
        });

        return updatedLink;
      } else {
        // If no user is logged in, throw an error
        throw new Error("You must be logged in to update a link description.");
      }
    }),

    deleteLink: protectedProcedure
    .input(
      z.object({
        short: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // Check if a user is logged in and if they have an ID
      if (ctx?.session?.user?.id) {
        // If a user is logged in, delete the link
        const deletedLink = await db.link.delete({
          where: { short: input.short },
        });

        return deletedLink;
      } else {
        // If no user is logged in, throw an error
        throw new Error("You must be logged in to delete a link.");
      }
    }),

    getLinkStats: publicProcedure
    .query(async () => {
      const input = { short: "LHIFYt4" }; // Fix: Define input as an object with the 'short' property
      const data = await db.link.findFirst({
        where: { short: input.short }, // Fix: Use the correct variable name 'input.short'
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
  
  