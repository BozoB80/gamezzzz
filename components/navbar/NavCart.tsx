import useCart from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"


const NavCart = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cart = useCart()
  const router = useRouter()
  
  if (!isMounted) {
    return null
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button variant="ghost" onClick={() => router.push('/cart')} className="relative flex items-center rounded-full px-4 py-2">
        <ShoppingCart size={24} color="black" />
        <span className="absolute top-0 right-1 flex h-5 w-5">
          <span className={cn("absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75",
            cart.items.length > 0 && "animate-ping"  
          )}></span>
          <span className="relative flex justify-center items-start text-base font-bold rounded-full h-5 w-5 bg-destructive">{cart.items.length}</span>
        </span>
      </Button>
    </div>
  );
}

export default NavCart;