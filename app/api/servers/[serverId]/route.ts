import currentProfile from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
    try {
      const body = await req.json();
      const { name, imageUrl } = body;
    const profile = await currentProfile();

    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("server id patch", error);
    throw new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
    try {
     
    const profile = await currentProfile();

    if (!profile) {
      throw new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
      
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("server id delete", error);
    throw new NextResponse("Internal error", { status: 500 });
  }
}

