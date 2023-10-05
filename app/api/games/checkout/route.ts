import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
) {
  try {
    const user = await currentUser();
    const { gamesIds } = await req.json()

    if (!gamesIds || gamesIds.length === 0) {
      return new NextResponse("Game ids are required", { status: 400 });
    }

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const games = await prismadb.game.findMany({
      where: {
        id: {
          in: gamesIds
        }    
      }
    });

    const gameIds = games.map((game) => game.id);

    const purchased = await prismadb.order.findFirst({
      where: {
        isPaid: true,
        orderItems: {
          some: {
            userId: user.id,
            gameId: {
              in: gameIds
            }
          }
        }
      },
      include: {
        orderItems: true
      }
    })

    const purchasedGameId = purchased?.orderItems.map((item) => item.gameId) || []

    const purchasedGames = await prismadb.game.findMany({
      where: {
        id: {
          in: purchasedGameId
        }
      }
    })

    if (purchased) {
      return new NextResponse(`${purchasedGames.map((game) => game.title)} is already`, { status: 400 });
    }

    if (!games) {
      return new NextResponse("Games not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    games.forEach((game) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: game.title,
            description: game.developer!
          },
          unit_amount: Math.round((game.discount ? game.price - (game.price * game.discount / 100) : game.price) * 100),
        }
      })
    })
    
    const order = await prismadb.order.create({
      data: {
        userId: user.id,
        isPaid: false,
        orderItems: {
          create: gamesIds.map((gameId: string) => ({
            game: {
              connect: {
                id: gameId
              }
            },
            userId: user.id
          })),
        }
      }
    })
    

    let stripeCustomer = await prismadb.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      }
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses[0].emailAddress,
      });

      stripeCustomer = await prismadb.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        }
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
        userId: user.id,
      }
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (error) {
    console.log("[GAME_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}