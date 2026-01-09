"use client"; // Required for useState

import { useState } from "react";
import { Search } from "lucide-react"; // Assuming you are using lucide-react, or remove icon if not
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question: "Can I cancel at anytime?",
    answer:
      "Yes, you can cancel anytime without questions. We would appreciate your feedback.",
  },
  {
    question: "Why should I go solar?",
    answer:
      "It is highly recommended if your monthly bill exceeds ₹2000 and you have roof access. It saves money and generates clean energy.",
  },
  {
    question: "What do I need to install a rooftop system?",
    answer:
      "You only need empty roof space and access. Fill out our form, and we handle the design, installation, and maintenance.",
  },
  {
    question: "What is a solar rooftop system?",
    answer:
      "It consists of panels mounted on your roof to generate power, saving land cost and utilizing unused terrace space.",
  },
  {
    question: "How does it work?",
    answer:
      "Solar panels convert sunlight into electricity using the photovoltaic (PV) effect via semiconductor cells like silicon.",
  },
  {
    question: "Price of solar system without subsidy?",
    answer: [
      "Prices vary by size (approximate range):",
      "2 kW: ₹1.5L - ₹2.28L",
      "3 kW: ₹1.92L - ₹2.63L",
      "5 kW: ₹2.87L - ₹4.14L",
      "10 kW: ₹5.59L - ₹7.08L",
    ],
  },
  {
    question: "What are the types of Solar systems?",
    answer: [
      "1. On-grid: Connected to the public grid; exports excess power for credits (Net-Metering).",
      "2. Off-grid: Uses batteries for storage; not connected to the grid.",
      "3. Hybrid: Combines both grid connection and battery storage for backup.",
    ],
  },
  {
    question: "Do panels work in monsoon/winter?",
    answer:
      "Yes, but with reduced efficiency. Our generation estimates already account for weather variations.",
  },
  {
    question: "How much electricity is produced?",
    answer:
      "On average, a 1 kW plant produces about 4 units of electricity per day, depending on weather and design.",
  },
  {
    question: "What is Net metering?",
    answer:
      "A billing mechanism where you get credits for excess power sent to the grid. You are only billed for the 'net' energy used.",
  },
  {
    question: "How do I decide the plant size?",
    answer:
      "It depends on your electricity consumption, shadow-free roof area, and local sunlight. We provide a scientific mapping to help you decide.",
  },
  {
    question: "What is the lifespan of the system?",
    answer:
      "The system lasts about 25 years. Panels usually have a 25-year warranty, and inverters have 5-12 years.",
  },
  {
    question: "Is maintenance expensive?",
    answer:
      "No, costs are very low due to few moving parts. We also provide the first 5 years of maintenance for free.",
  },
  {
    question: "Do I need to clean the panels?",
    answer:
      "Yes, 1-2 times a month using water and a soft cloth/sponge. Avoid detergents and clean only when panels are cool (morning/night).",
  },
  {
    question: "How much does it cost?",
    answer:
      "Cost depends on system size and components. Our engineers will determine the best price after a site assessment.",
  },
  {
    question: "What is the break-even period?",
    answer:
      "Typically 2-4 years. After that, you enjoy free electricity for the remainder of the 25-year lifespan.",
  },
  {
    question: "Are financing options available?",
    answer:
      "Yes, we offer EMI options and facilitate collateral-free loans from various banks.",
  },
  {
    question: "Are there government subsidies?",
    answer: {
      info: "Yes, central subsidies are available for residential projects:",
      table: [
        {
          segment: "Individual",
          projectSize: "1kW - 2kW",
          subsidy: "₹30k - ₹60k",
        },
        { segment: "Individual", projectSize: "Above 3kW", subsidy: "₹78,000" },
        { segment: "Societies", projectSize: "Per kW", subsidy: "₹18,000/kw" },
      ],
      additional_state_subsidy:
        "Note: Some states (like UP) offer additional subsidies up to ₹30,000 extra.",
    },
  },
];

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredFaqs = faqs.filter((faq) => {
    const query = searchQuery.toLowerCase();
    const questionMatch = faq.question.toLowerCase().includes(query);

    // Check answer text (handling different data structures)
    let answerMatch = false;
    if (typeof faq.answer === "string") {
      answerMatch = faq.answer.toLowerCase().includes(query);
    } else if (Array.isArray(faq.answer)) {
      answerMatch = faq.answer.some((line) =>
        line.toLowerCase().includes(query)
      );
    } else if (typeof faq.answer === "object" && faq.answer.info) {
      answerMatch = faq.answer.info.toLowerCase().includes(query);
    }

    return questionMatch || answerMatch;
  });

  return (
    <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Your questions, answered
        </h2>
        <p className="mt-1 text-muted-foreground">
          Everything you need to know about going solar.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10 relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-2xl mx-auto">
        {filteredFaqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : Array.isArray(faq.answer) ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {faq.answer.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  ) : typeof faq.answer === "object" && faq.answer.table ? (
                    <>
                      <p className="mb-3">{faq.answer.info}</p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-blue-50">
                              <th className="border p-2 text-left">Segment</th>
                              <th className="border p-2 text-left">Size</th>
                              <th className="border p-2 text-left">Subsidy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {faq.answer.table.map((row, idx) => (
                              <tr key={idx}>
                                <td className="border p-2">{row.segment}</td>
                                <td className="border p-2">
                                  {row.projectSize}
                                </td>
                                <td className="border p-2">{row.subsidy}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-3 text-sm italic">
                        {faq.answer.additional_state_subsidy}
                      </p>
                    </>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
