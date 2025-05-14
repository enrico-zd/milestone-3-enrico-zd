import Navigation from "@/app/components/Navigation";
import { openSans } from "@/app/fonts";
import { fetchProductBySlug } from "@/utils/ProductApi";
import Image from "next/image";


export default async function ProductDetail({ params }: {
    params: Promise<{
        slug: string
    }>;
}): Promise<React.JSX.Element>{
    const {slug} = await params;
    
    const data = await fetchProductBySlug(slug);

    return(
      <div>
        <Navigation />

        <div className="flex flex-row gap-6 h-screen justify-center items-center -translate-y-12">
          <div className="w-[400px] h-[400px] relative rounded-lg overflow-hidden">
            <Image 
            src={data.images[0]}
            fill
            alt={data.title}
            />
          </div>

          <div className={`h-[400px] w-[480px] border border-gray-100 shadow-lg rounded-lg relative ${openSans.className}`}>
            <h1 className="text-xl mt-6 ml-6 font-semibold">{data.title}</h1>
            <p className="text-base mt-1 ml-6 text-gray-500">Category: {data.category.name}</p>
            <p className="text-xl mt-2 ml-6 font-semibold">${data.price}</p>
            <h2 className="text-xl mt-4 ml-6 font-semibold">Description:</h2>
            <p className="text-sm ml-6 mr-6">{data.description}</p>
            <div className="absolute right-6 bottom-4 flex justify-end items-end">
              <button className="w-[145px] h-[35px] text-white hover:text-gray-100 rounded-3xl bg-[#45A2FF] hover:bg-[#45aeff]">Add to Cart</button>
            </div>
          </div>
        </div>
        
      </div>  
    );
}