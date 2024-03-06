import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const body = await req.json();

    const { name, type } = body;

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }
    if (!serverId) {
      throw new NextResponse("ServerId is missing", { status: 400 });
    }

    if (name === "general") {
      throw new NextResponse("Name cannot be 'general'", { status: 400 });
    }

    
    const server = await db.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              profileId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR]
              }
            }
          }
        },
        data: {
          channels: {
            create: {
              profileId: profile.id,
              name,
              type,
            }
          }
        }
      });
  
      return NextResponse.json(server);
  } catch (error) {
    console.log("channel post", error);
    throw new NextResponse("Internal error", { status: 500 });
  }
}
