import { format } from 'date-fns'
import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/BillboardClient";
import { BillboardColumn } from "./components/columns";

const BillboardsPage = async () => {
  const billboards = await prismadb.billboard.findMany({
    orderBy: {
      createdAt: "asc"
    }
  })

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-1 flex-col">
      <div className="space-y-4 p-2 md:p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}

export default BillboardsPage;