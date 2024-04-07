import { type NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function middleware(req: NextRequest) {
  // Get pathname:
  const slug = req.nextUrl.pathname.split("/").pop();

  // Get data from query:
  const data = await db.link.findFirst({
    where: {
      short: {
        equals: slug,
      },
    },
  });

  // Check if data exists and contains a URL:
  if (data?.url) {
    // Update the click counter:
    const updatedData = await db.link.update({
      where: {
        short: slug,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    if (!updatedData) {
      console.log(`Failed to update clicks for slug: ${slug}`);
    }

    // Redirect to the URL associated with the slug:
    return NextResponse.redirect(new URL(data.url));
  } else {
    // If no data or URL found, redirect to origin:
    return NextResponse.redirect(req.nextUrl.origin);
  }
}
export const config = {
    matcher: "/l/:slug*",
};