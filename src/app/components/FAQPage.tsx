import React from "react";
import { IFAQ, IFAQProps } from "@/types";

const FAQPage: React.FC<IFAQProps> = ({faqs}) =>{
    
    return (
        <div className="w-[50%] mx-auto my-6">
            {faqs.map((faq: IFAQ, index: number) => (
                <div key={index} className="border-b-1 border-gray-300 mb-2">
                    <h3 className="text-xl font-semibold mb-1">{faq.question}</h3>
                    <p className="mb-2">{faq.answer}</p>
                </div>
            ))}
        </div>
    );
}

export default FAQPage;