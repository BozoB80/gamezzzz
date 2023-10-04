"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

const Summary = () => {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0) 
  
  const totalDiscount = items.reduce((discount, item) => {
    if (item.discount) {
      return discount + (Number(item.price) * (item.discount / 100));
    }
    return discount;
  }, 0);

  const discountedPrice = totalPrice - totalDiscount

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({ description: "Payment completed." })
      removeAll()
    }

    if (searchParams.get("cancelled")) {
      toast({ variant: "destructive", description: "Something went wrong." })
    }
  }, [searchParams, removeAll, toast])
  

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/games/checkout`, {
        gamesIds: items.map((item) => item.id)
      }) 
      window.location.assign(response.data.url)  

    } catch (error: any) {
      if (error.response && error.response.data.includes("is already")) {
        const gameTitle = error.response.data
        toast({ variant: "destructive", title: `The game ${gameTitle} in your library!`, description: "Please remove it to continue."})
      } else {
        toast({ description: "Something went wrong" })
      }
    } finally {
      setIsLoading(false);
    }  
  }  

  return (
    <div className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 text-white/90">
      <h2 className="text-4xl font-medium ">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center text-white/60 justify-between border-t border-gray-200 pt-4">
          <div className="text-xl font-medium">
            Price
          </div>
          <h1 className="text-xl font-medium">€{totalPrice.toFixed(2)}</h1>
        </div>
        <div className="flex items-center text-white/60 justify-between pt-4">
          <div className="text-xl font-medium">
            Sale discount
          </div>
          <h1 className="text-xl font-medium">- €{totalDiscount.toFixed(2)}</h1>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-xl font-medium">
            Order Total
          </div>
          <h1 className="text-xl font-medium">€{discountedPrice.toFixed(2)}</h1>
        </div>
      </div>
      <Button disabled={isLoading} size="lg" onClick={onCheckout} className="w-full text-xl font-semibold mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
