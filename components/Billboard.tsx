import { Billboard } from "@prisma/client";


interface BillboardProps {
  data: Billboard
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {


  return (
    <div className="p-4 sm:p-6 lg:p-0 lg:pb-8 rounded-xl overflow-hidden">
      <div 
        style={{ backgroundImage: `url(${data?.imageUrl})`}} 
        className="rounded-xl relative aspect-square md:aspect-[2.9/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-white text-3xl sm:text-5xl lg:text-6xl max-w-xs sm:max-w-2xl">
            {data.label}
          </div>
        </div>        
      </div>
    </div>
  );
}

export default Billboard;