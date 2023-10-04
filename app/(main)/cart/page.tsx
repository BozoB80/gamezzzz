"use client";

import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import CartItem from "./_components/CartItem";
import Summary from "./_components/Summary";
import { ShoppingBasket } from "lucide-react";
import Link from "next/link";


const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }  

  return (
    <div className="bg-games-bg bg-cover bg-no-repeat bg-center min-h-screen">
      <div className="max-w-7xl mx-auto h-full p-0 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white">My Cart</h1>
          {cart.items.length === 0 ? (
            <div className="w-full h-full flex flex-col justify-center items-center text-white space-y-8">
              <ShoppingBasket size={80} />
              <h1 className="text-5xl">Your cart is empty!</h1>
              <Link href="/" className="text-xl text-white/60 underline underline-offset-4 hover:text-white hover:underline">
                Shop for our finest selection
              </Link>
            </div>
          ) : (
            
            <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-7">
                <ul>
                  {cart.items.map((item) => (
                    <CartItem key={item.id} data={item} />
                  ))}
                </ul>
              </div>
              <Summary />
          </div>
           )}
      </div>
    </div>
  );
};

export default CartPage;
