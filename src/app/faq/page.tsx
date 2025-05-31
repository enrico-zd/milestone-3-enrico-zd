import Image from "next/image";
import FAQPage from "../components/FAQPage";
import { fetchFQA } from "@/utils/FAQApi";
import { openSans } from "../fonts";

// set revalidation time
export const revalidate = 3600;

export default async function FAQ() {

  // fetch data FAQ
  const faqs = await fetchFQA();

  return (
    <div>
        <div className={`h-[400px] gap-40 flex flex-row w-full justify-center items-center ${openSans.className}`}>
            <div className="w-[440px]">
              <h1 className="font-bold text-4xl">FAQs</h1>
              <p className="text-xl mt-2">Have questions? Here you will find the answers most valued by our customers, along with access to step-by-step instructions and support.</p>
            </div>
            <div>
              {/* <img src="/faq.webp" alt="FAQ" className="w-[470px] h-[294px]"/> */}
              <Image 
              src={"/faq.webp"}
              width={470}
              height={294}
              alt="FAQ"
              />
            </div>
        </div>

        <div className="bg-[#F5F5F5] flex">
          <FAQPage faqs={faqs}/>
        </div>
        
    </div>
  );
}