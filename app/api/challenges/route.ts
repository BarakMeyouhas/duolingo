import { drizzle } from 'drizzle-orm/neon-http';
import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin";
import { challenges } from "@/db/schema";
import db from '@/db/dirzzle';

export const GET = async () => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const data = await db.query.challenges.findMany();

  return NextResponse.json(data);
};

export const POST = async (req: Request) => {
  if (!isAdmin()) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .insert(challenges)
    .values({
      ...body,
    })
    .returning();

  return NextResponse.json(data[0]);
};
