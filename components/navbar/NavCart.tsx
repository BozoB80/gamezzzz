import useCart from "@/hooks/use-cart"
import { ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"


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
        <span className="absolute top-0 right-1 text-sm font-semibold px-1.5 rounded-full bg-destructive">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
}

export default NavCart;