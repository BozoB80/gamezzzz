import { format } from 'date-fns'
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { OrderClient } from './components/client';

const OrdersPage = async () => {
  const orders = await prismadb.order.findMany({
    include: {
      orderItems: {
        include: {
          game: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    userName: order.userName,
    address: order.address,
    games: order.orderItems.map((item) => item.game.title).join(", "),
    totalPrice: (order.orderItems.reduce((total, item) => {
      return total + Number(item.game.price)
    }, 0)),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}

export default OrdersPage;