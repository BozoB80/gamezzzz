import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    if (!params.gameId) {
      return new NextResponse("Game id is required", { status: 400 });
    }

    const game = await prismadb.game.findUnique({
      where: {
        id: params.gameId
      },
      include: {
        images: true,
        category: true,
      }
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAME_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function DELETE(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.gameId) {
      return new NextResponse("Game id is required", { status: 400 });
    }

    const game = await prismadb.game.delete({
      where: {
        id: params.gameId
      }
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAME_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { title, description, features, bannerImg, logoImg, titleImg, images, releaseDate, price, discount, rating, developer, size, categoryId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!title) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!releaseDate) {
      return new NextResponse("Release date is required", { status: 400 });
    }

    await prismadb.game.update({
      where: {
        id: params.gameId
      },
      data: {
        title,
        description,
        features,
        bannerImg,
        logoImg,
        titleImg,
        releaseDate,
        price,
        discount,
        rating,
        developer,
        size,
        categoryId,
        images: {
          deleteMany: {}
        }
      }
    })

    const game = await prismadb.game.update({
      where: {
        id: params.gameId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAME_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};