import { z } from "zod";
import { db } from "~/server/db";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import crypto from 'crypto';

export const urlRouter = createTRPCRouter({
    createShortUrl: protectedProcedure
    .input(
        z.object({ 
            url: z.string(),
        })
    )

    .mutation(async ({input, ctx}) => {
        // Función para generar un string aleatorio en base64
        const generateShortUrl = () => {
            return crypto.randomBytes(5).toString('base64').substring(0, 7);
        }

        // Función recursiva para comprobar que la URL corta no existe en la base de datos
        const getUniqueShortUrl = async (): Promise<string> => {
            const shortUrl = generateShortUrl();
            const existingUrl = await db.link.findUnique({ where: { short: shortUrl } });

            if (existingUrl) {
                return getUniqueShortUrl();
            } else {
                return shortUrl;
            }
        }

        const shortUrl = await getUniqueShortUrl();

        const bigUrl = await db.link.create({
            data: {
                url: input.url,
                createdBy: { connect: { id: ctx.session.user.id } },
                short: shortUrl,
            },
        });

        return bigUrl;
    }),
});