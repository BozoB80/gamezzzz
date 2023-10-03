"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from 'react';

const Summary = () => {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const items = useCart((state) => state.items)
  const removeAll = useCart((state) => state.removeAll)

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)  

  useEffect(() => {
    if (searchParams.get("success")) {
      toast({ description: "Payment completed." })
      removeAll()
    }

    if (searchParams.get("cancelled")) {
      toast({ variant: "destructive", description: "Something went wrong." })
    }
  }, [searchParams, removeAll])
  

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id)
    })

    window.location = response.data.url
  }

  return (
    <div className="mt-16 rounded-lg px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 text-white/90">
      <h2 className="text-4xl font-medium ">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-xl font-medium">
            Order Total
          </div>
          <h1 className="text-xl font-medium">€{totalPrice.toFixed(2)}</h1>
        </div>
      </div>
      <Button disabled={items.length === 0} size="lg" onClick={onCheckout} className="w-full text-xl font-semibold mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
