"use client";

import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import CartItem from "./_components/CartItem";
import Summary from "./_components/Summary";


const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(cart);
  

  return (
    <div className="bg-games-bg bg-cover bg-no-repeat bg-center h-full">
      <div className="max-w-7xl mx-auto h-full p-0 px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-white">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <p className="text-neutral-500">No items added to cart</p>
            )}
            <ul>
              {cart.items.map((item) => (
                <CartItem key={item.id} data={item} />
              ))}
            </ul>
          </div>
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
