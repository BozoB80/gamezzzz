import { Overview } from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getGraphRevenue } from "@/lib/get-graph-revenue";
import prismadb from "@/lib/prismadb";
import { CreditCard, DollarSign, Package } from "lucide-react";

const AdminPage = async () => {
  const graphRevenue = await getGraphRevenue()

  const paidOrders = await prismadb.order.findMany({
    where: {
      isPaid: true
    },
    include: {
      orderItems: {
        include: {
          game: true
        }
      }
    }
  })

  const salesCount = await prismadb.order.count({
    where: {
      isPaid: true
    }
  })

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.game.price
    }, 0)
    return total + orderTotal
  }, 0)

  // Calculate the number of sold copies for each game
  const gameSalesCount: Record<string, number> = {};

  paidOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const gameId = item.game.id;
      if (gameSalesCount[gameId]) {
        gameSalesCount[gameId]++;
      } else {
        gameSalesCount[gameId] = 1;
      }
    });
  });

  let mostPopularGameId = null;
  let maxSalesCount = 0;
  for (const gameId in gameSalesCount) {
    if (gameSalesCount[gameId] > maxSalesCount) {
      mostPopularGameId = gameId;
      maxSalesCount = gameSalesCount[gameId];
    }
  }

  let mostPopularGameTitle = "No game found";
  if (mostPopularGameId) {
    const mostPopularGame = await prismadb.game.findUnique({
      where: {
        id: mostPopularGameId
      }
    });
  
    if (mostPopularGame) {
      mostPopularGameTitle = mostPopularGame.title;
    }
  }



  return (
    <div className="flex-1 flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                € {totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+ {salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                The most popular game
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
              {mostPopularGameTitle} (No. of sales: {maxSalesCount})
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
