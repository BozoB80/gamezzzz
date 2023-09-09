import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
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

    const game = await prismadb.game.create({
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
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(game);
  } catch (error) {
    console.log('[GAMES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId') || undefined;    

    const games = await prismadb.game.findMany({
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(games);
  } catch (error) {
    console.log('[GAMES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};