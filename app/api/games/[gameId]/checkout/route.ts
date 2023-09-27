import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";


export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const game = await prismadb.game.findUnique({
      where: {
        id: params.gameId,        
      }
    });

    const purchase = await prismadb.purchase.findUnique({
      where: {
        userId_gameId: {
          userId: user.id,
          gameId: params.gameId
        }
      }
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!game) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "EUR",
          product_data: {
            name: game.title,
            description: game.description!,
          },
          unit_amount: Math.round(game.price! * 100),
        }
      }
    ];

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
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/games/${game.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/games/${game.id}?canceled=1`,
      metadata: {
        gameId: game.id,
        userId: user.id,
      }
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[GAME_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 })
  }
}