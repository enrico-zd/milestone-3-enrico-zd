'use client';

import React, { useState } from "react";
import { IFAQ, IFAQProps } from "@/types";

const FAQPage: React.FC<IFAQProps> = ({faqs}) => {
    const [expandedId, setExpandedId] = useState<number[]>([]);

    const toggleExpanded = (index: number) => {
        setExpandedId(expandedId.includes(index) ? expandedId.filter(id => id !== index) : [...expandedId, index]);
    };
    
    return (
        <div className="w-[56%] mx-auto my-6">
            {faqs.map((faq: IFAQ, index: number) => (
                <div key={index} className="border-b border-gray-300 mb-4 pb-2">
                    <h3 
                        className="text-xl font-semibold mb-1 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleExpanded(index)}
                    >
                        {faq.question}
                        <span>{expandedId.includes(index) ? '−' : '+'}</span>
                    </h3>
                    {expandedId.includes(index) && (
                        <p className="mb-2">{faq.answer}</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default FAQPage;